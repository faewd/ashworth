import { getUserProfile } from "@/lib/service/user"

export async function GET() {
  const profile = await getUserProfile()
  return Response.json(profile)
}
