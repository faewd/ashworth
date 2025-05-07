import { withErrorHandling } from "@/lib/error"
import { getCurrentUser } from "@/lib/service/user"

export async function GET() {
  return withErrorHandling(async () => {
    const user = await getCurrentUser()
    return Response.json(user?.toObject() ?? null)
  })
}
