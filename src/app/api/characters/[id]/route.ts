import { NotFoundError, PermissionDeniedError, withErrorHandling } from "@/lib/error"
import { deleteCharacter, getCharacter, updateCharacter } from "@/lib/service/character"
import { getCurrentUser } from "@/lib/service/user"

type RouteProps = {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: Request, { params }: RouteProps) {
  return withErrorHandling(async () => {
    const { id } = await params
    const patch = await req.json()
  
    const char = await getCharacter(id)
    if (char === null) throw new NotFoundError(`No character exists with ID ${id}`)
  
    const user = await getCurrentUser()
  
    if (user === null || char.owner.id !== user.id) throw new PermissionDeniedError("You don't have permission to edit that character.")
  
    await updateCharacter(char.id, patch)
  
    const updated = await getCharacter(id)
    return Response.json(updated!.toJSON())
  })
}

export async function GET(_: Request, { params }: RouteProps) {
  return withErrorHandling(async () => {
    const { id } = await params
  
    const char = await getCharacter(id)
    if (char === null) throw new NotFoundError(`No character exists with ID ${id}`)
  
    const user = await getCurrentUser()
    if (!char.publiclyVisible && (user === null || char.owner.id !== user.id))
      throw new NotFoundError(`No character exists with ID ${id}`)
    
    return Response.json(char.toJSON())
  })
}

export async function DELETE(_: Request, { params }: RouteProps) {
  return withErrorHandling(async () => {
    const { id } = await params
    const user = await getCurrentUser()
    if (user === null) throw new NotFoundError(`No character exists with ID ${id}`)
    await deleteCharacter(id, user)
  
    return new Response(null, { status: 204 })
  })
}