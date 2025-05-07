import mongoose, { Model, SchemaTypes } from "mongoose"
import { IUser } from "./user"
import { ensureDB } from "@/lib/db"
import { skills } from "@/lib/data/skills"
import Joi from "joi"

export interface AbilityScore {
  base: number;
  bonus: number;
  tempBonus: number;
  proficient: boolean;
}

const abilityScoreValidator = Joi.object({
  base: Joi.number().required().positive(),
  bonus: Joi.number().required(),
  tempBonus: Joi.number().required(),
  proficient: Joi.boolean().required(),
})

const AbilityScoreSchema = new mongoose.Schema<AbilityScore>({
  base: { type: Number, default: 10 },
  bonus: { type: Number, default: 0 },
  tempBonus: { type: Number, default: 0 },
  proficient: { type: Boolean, default: false },
}, { _id: false })

export interface AbilityScores {
  str: AbilityScore;
  dex: AbilityScore;
  con: AbilityScore;
  int: AbilityScore;
  wis: AbilityScore;
  cha: AbilityScore;
}

const abilityScoresValidator = Joi.object({
  str: abilityScoreValidator,
  dex: abilityScoreValidator,
  con: abilityScoreValidator,
  int: abilityScoreValidator,
  wis: abilityScoreValidator,
  cha: abilityScoreValidator,
})

const AbilityScoresSchema = new mongoose.Schema<AbilityScores>({
  str: AbilityScoreSchema,
  dex: AbilityScoreSchema,
  con: AbilityScoreSchema,
  int: AbilityScoreSchema,
  wis: AbilityScoreSchema,
  cha: AbilityScoreSchema,
}, { _id: false })

export enum Proficiency {
  NONE = 0,
  PROFICIENT = 1,
  EXPERT = 2,
}

export type Skill = {
  proficiency: Proficiency;
  tempBonus: number;
}

const skillValidator = Joi.object({
  proficiency: Joi.allow(1, 2, 3),
  tempBonus: Joi.number().required(),
})

const SkillSchema = new mongoose.Schema<Skill>({
  proficiency: Number,
  tempBonus: Number,
}, { _id: false })

export type Skills = {
  [key in keyof typeof skills]: Skill
}

const skillsValidator = Joi.object(Object.fromEntries(
  Object.keys(skills).map((skill) => [skill, skillValidator]),
))

const SkillsSchema = new mongoose.Schema<Skills>(Object.fromEntries(
  Object.keys(skills).map((skill) => [skill, SkillSchema]),
), { _id: false })

export interface CharacterClass {
  class: string;
  level: number;
  subclass: string;
}

const classValidator = Joi.object({
  class: Joi.string().required().max(50),
  level: Joi.number().required().min(1).max(25),
  subclass: Joi.string().min(0).max(50),
})

const ClassSchema = new mongoose.Schema<CharacterClass>({
  class: String,
  level: Number,
  subclass: String,
}, { _id: false })

export interface ICharacter {
  id: string;
  owner: IUser;
  publiclyVisible: boolean;
  name: string;
  species: string;
  classes: CharacterClass[];
  background: string;
  abilityScores: AbilityScores;
  skills: Skills;
}

export const characterValidator = Joi.object({
  publiclyVisible: Joi.boolean().required(),
  name: Joi.string().required().min(1).max(50),
  species: Joi.string().required().max(50),
  classes: Joi.array().items(classValidator),
  background: Joi.string().required().max(50),
  abilityScores: abilityScoresValidator,
  skills: skillsValidator,
})

export const CharacterSchema = new mongoose.Schema<ICharacter>({
  id: String,
  owner: { type: SchemaTypes.ObjectId, ref: "user" },
  publiclyVisible: { type: Boolean, default: false },
  name: String,
  species: String,
  classes: [ClassSchema],
  background: String,
  abilityScores: AbilityScoresSchema,
  skills: SkillsSchema,
})

const db = await ensureDB()
export const Character: Model<ICharacter> = db.models.character ?? db.model('character', CharacterSchema)
