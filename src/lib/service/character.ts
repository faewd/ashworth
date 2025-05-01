import { ensureDB } from "../db"
import { Character, ICharacter } from "../models/character"
import { Doc } from "./doc"
import { IUser } from "../models/user"
import { nanoid } from "nanoid"

export async function createCharacter(name: string, owner: Doc<IUser>): Promise<Doc<ICharacter>> {
  await ensureDB()
  const id = nanoid()
  const newChar = new Character({
    id,
    name,
    owner,
    species: "Human",
    class: "Fighter",
    level: 1,
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
  })
  const character = await newChar.save()
  return character
}

export async function getCharacter(id: string): Promise<Doc<ICharacter> | null> {
  await ensureDB()
  const character = await Character.findOne({ id }).populate("owner")
  return character
}

export async function updateCharacter(id: string, char: Partial<ICharacter>): Promise<Doc<ICharacter>> {
  await ensureDB()
  delete char.owner
  const updated = await Character.findOneAndUpdate({ id: id }, char).populate("owner")
  if (updated === null) throw new Error("No such character")
  return updated
}
