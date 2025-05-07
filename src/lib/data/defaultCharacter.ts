import { ICharacter, Proficiency, Skill } from "../models/character"
import { skills } from "./skills"

export const defaultCharacter = {
  publiclyVisible: false,
  species: "Human",
  classes: [{ class: "Fighter", subclass: "", level: 1 }],
  background: "Folk Hero",
  abilityScores: {
    str: {
      base: 10,
      bonus: 0,
      tempBonus: 0,
      proficient: false,
    },
    dex: {
      base: 10,
      bonus: 0,
      tempBonus: 0,
      proficient: false,
    },
    con: {
      base: 10,
      bonus: 0,
      tempBonus: 0,
      proficient: false,
    },
    int: {
      base: 10,
      bonus: 0,
      tempBonus: 0,
      proficient: false,
    },
    wis: {
      base: 10,
      bonus: 0,
      tempBonus: 0,
      proficient: false,
    },
    cha: {
      base: 10,
      bonus: 0,
      tempBonus: 0,
      proficient: false,
    },
  },
  skills: Object.fromEntries(Object.keys(skills).map((skill) => [skill, { proficiency: Proficiency.NONE, tempBonus: 0 }])) as Record<keyof typeof skills, Skill>,
} satisfies Omit<ICharacter, "id" | "name" | "owner">