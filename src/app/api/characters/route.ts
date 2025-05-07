import { UnauthenticatedError, withErrorHandling } from "@/lib/error"
import { createCharacter } from "@/lib/service/character"
import { getCurrentUser } from "@/lib/service/user"

export async function POST(req: Request) {
  return withErrorHandling(async () => {
    const { name } = await req.json()
    const user = await getCurrentUser()
    if (user === null) throw new UnauthenticatedError("You must be logged in to create characters.")
    const character = await createCharacter(name, user)
    return Response.json(character.toJSON())
  })
}
