import mongoose, { Model, SchemaTypes } from "mongoose"
import { IUser } from "./user"
import { ensureDB } from "../db"

export interface AbilityScore {
  base: number
  bonus: number
  tempBonus: number
  proficient: boolean
}

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

const AbilityScoresSchema = new mongoose.Schema<AbilityScores>({
  str: AbilityScoreSchema,
  dex: AbilityScoreSchema,
  con: AbilityScoreSchema,
  int: AbilityScoreSchema,
  wis: AbilityScoreSchema,
  cha: AbilityScoreSchema,
}, { _id: false })

export interface ICharacter {
  id: string;
  owner: IUser;
  publiclyVisible: boolean;
  name: string;
  species: string;
  class: string;
  level: number;
  abilityScores: AbilityScores
}

export const CharacterSchema = new mongoose.Schema<ICharacter>({
  id: String,
  owner: { type: SchemaTypes.ObjectId, ref: "user" },
  publiclyVisible: { type: Boolean, default: false },
  name: String,
  species: String,
  class: String,
  level: Number,
  abilityScores: AbilityScoresSchema,
})

const db = await ensureDB()
export const Character: Model<ICharacter> = db.models.character ?? db.model('character', CharacterSchema)
