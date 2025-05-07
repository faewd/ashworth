import { withErrorHandling } from "@/lib/error"
import { getUserProfile } from "@/lib/service/user"

export async function GET() {
  return withErrorHandling(async () => {
    const profile = await getUserProfile()
    return Response.json(profile)
  })
}
