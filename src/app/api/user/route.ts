import { getCurrentUser } from "@/lib/service/user"

export async function GET() {
  const user = await getCurrentUser()
  return Response.json(user?.toObject() ?? null)
}
