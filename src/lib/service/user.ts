import { auth0 } from "@/lib/auth0"
import { ensureDB } from "@/lib/db"
import { IUser, User } from "@/lib/models/user"
import { Doc } from "./doc"

import "@/lib/models/character"
import { Character } from "@/lib/models/character"
import { Sheet } from "../sheet/sheet"

export async function getCurrentUser(): Promise<Doc<IUser> | null> {
  await ensureDB()
  const session = await auth0.getSession()
  if (session === null) return null
  const { user } = session
  const userData = {
    id: user.sub,
    name: user.name,
    picture: user.picture,
  }
  return (await User.findOneAndUpdate({ id: user.sub }, userData, { upsert: true, new: true }))
}

export type Profile = IUser & {
  characters: Sheet[];
}

export async function getUserProfile(): Promise<Profile | null> {
  const user = await getCurrentUser()
  if (user === null) return null
  const characters = await Character.find({ owner: user })
  return {
    ...user.toJSON(),
    characters: characters.map(char => new Sheet(char.toJSON())),
  }
}
