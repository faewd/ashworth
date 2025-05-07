import { ensureDB } from "@/lib/db"
import { Character, characterValidator, ICharacter } from "@/lib/models/character"
import { Doc } from "./doc"
import { IUser } from "@/lib/models/user"
import { nanoid } from "nanoid"
import { Sheet } from "@/lib/sheet/sheet"
import { defaultCharacter } from "@/lib/data/defaultCharacter"
import { NotFoundError, PermissionDeniedError, ValidationError } from "@/lib/error"

export async function createCharacter(name: string, owner: Doc<IUser>): Promise<Sheet> {

  const validationResult = characterValidator.extract("name").validate(name)
  if (validationResult.error !== undefined) {
    throw new ValidationError(validationResult.error)
  }

  await ensureDB()
  const id = nanoid()
  const newChar = new Character({ ...defaultCharacter, id, name, owner })
  const character = await newChar.save()

  return new Sheet(character.toObject())
}

export async function getCharacter(id: string): Promise<Sheet | null> {
  await ensureDB()
  const character = await Character.findOne({ id }).populate("owner")
  if (character === null) return null
  return new Sheet(character.toObject())
}

type PickOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export async function updateCharacter(id: string, patch: PickOptional<ICharacter, "id" | "owner">): Promise<Sheet> {
  delete patch.owner
  delete patch.id
  
  const validationResult = characterValidator.validate(patch, { stripUnknown: true })
  if (validationResult.error !== undefined) {
    throw new ValidationError(validationResult.error)
  }

  await ensureDB()

  const updated = await Character.findOneAndUpdate({ id }, patch).populate("owner")
  if (updated === null) throw new NotFoundError(`No character exists with ID ${id}`)
  
  return new Sheet(updated.toObject())
}

export async function deleteCharacter(id: string, owner: IUser): Promise<void> {
  await ensureDB()
  const character = await Character.findOne({ id }).populate("owner")
  if (character === null) throw new NotFoundError(`No character exists with ID ${id}`)
  if (owner.id !== character.owner.id) throw new PermissionDeniedError("The character's owner must delete the sheet.")
  await character.deleteOne()
}
