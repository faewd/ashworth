import { FileSpreadsheet } from "lucide-react"
import Heading from "./Heading"
import UserControls from "./UserControls"

export default function Navbar() {
  return (
    <nav className="flex gap-2 items-center bg-zinc-950 px-2 h-12">
      <FileSpreadsheet size={28} className="ml-3 mr-2 text-indigo-300 -mt-px" />
      <Heading rank={1} className="text-2xl">Ashworth&apos;s Sheet Manager</Heading>
      <div className="ml-auto flex gap-2 items-center h-full">
        <UserControls />
      </div>
    </nav>
  )
}
