import { createCharacter } from "@/lib/service/character"
import { getCurrentUser } from "@/lib/service/user"

export async function POST(req: Request) {
  const { name } = await req.json()
  const user = await getCurrentUser()
  if (user === null) throw new Error("Failed to create character - no active user")
  const character = await createCharacter(name, user)
  return Response.json(character.toJSON())
}
