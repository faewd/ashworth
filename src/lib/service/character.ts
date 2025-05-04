import { ensureDB } from "@/lib/db"
import { Character, ICharacter, Proficiency, Skill } from "@/lib/models/character"
import { Doc } from "./doc"
import { IUser } from "@/lib/models/user"
import { nanoid } from "nanoid"
import { Sheet } from "@/lib/sheet/sheet"
import { skills } from "@/lib/data/skills"

export async function createCharacter(name: string, owner: Doc<IUser>): Promise<Sheet> {
  await ensureDB()
  const id = nanoid()
  const newChar = new Character({
    id,
    name,
    owner,
    publiclyVisible: false,
    species: "Human",
    class: "Fighter",
    subclass: "",
    background: "Folk Hero",
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
    skills: Object.fromEntries(Object.keys(skills).map((skill) => [skill, { proficiency: Proficiency.NONE, tempBonus: 0 }])) as Record<keyof typeof skills, Skill>,
  } satisfies ICharacter)
  const character = await newChar.save()

  return new Sheet(character.toObject())
}

export async function getCharacter(id: string): Promise<Sheet | null> {
  await ensureDB()
  const character = await Character.findOne({ id }).populate("owner")
  if (character === null) return null
  return new Sheet(character.toObject())
}

export async function updateCharacter(id: string, char: Partial<ICharacter>): Promise<Sheet> {
  await ensureDB()
  delete char.owner
  const updated = await Character.findOneAndUpdate({ id: id }, char).populate("owner")
  if (updated === null) throw new Error("No such character")
  return new Sheet(updated.toObject())
}

export async function deleteCharacter(id: string, owner: IUser): Promise<void> {
  await ensureDB()
  const character = await Character.findOne({ id }).populate("owner")
  if (character === null) throw new Error("No such character")
  if (owner.id !== character.owner.id) throw new Error("The character's owner must delete the sheet.")
  await character.deleteOne()
}