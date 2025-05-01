import { updateCharacter } from "@/lib/service/character"

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params
  const char = await req.json()
  const updated = await updateCharacter(id, char)
  return Response.json(updated.toJSON())
}
