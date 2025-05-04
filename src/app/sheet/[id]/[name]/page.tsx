import Alert from "@/lib/components/Alert"
import Sheet from "@/app/sheet/[id]/[name]/Sheet"
import { getCharacter } from "@/lib/service/character"
import { getCurrentUser } from "@/lib/service/user"
import { redirect } from "next/navigation"

type SheetPageProps = {
  params: Promise<{
    id: string;
    name: string;
  }>;
}

export default async function SheetPage({ params }: SheetPageProps) {

  const { id, name } = await params

  const user = await getCurrentUser()
  const char = await getCharacter(id)

  if (user === null) return <Alert color="error">You must be logged in to view character sheets.</Alert>
  
  if (char === null || (!char.publiclyVisible && char.owner.id !== user.id)) return <Alert color="error">No character exists with ID &quot;{id}&quot;</Alert>

  if (char.name !== decodeURIComponent(name)) {
    redirect(`/sheet/${char.id}/${char.name}`)
  }

  return <Sheet character={char.toJSON()} readonly={char.owner.id !== user.id} />
}
