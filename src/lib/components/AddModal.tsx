import { FileUser, Users } from "lucide-react"
import Button, { IconProps, TrueButtonProps } from "./Button"
import { useModal } from "../context/modalContext"
import CreateCharacterModal from "./CreateCharacterModal"

export default function AddModal() {

  const modal = useModal()

  function handleCreateCharacter() {
    modal.push(<CreateCharacterModal />, "Create Character")
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <ActionButton icon={FileUser} onClick={handleCreateCharacter}>Create Character</ActionButton>
      <ActionButton icon={Users} onClick={() => {}} disabled>Create Party</ActionButton>
    </div>
  )
}

type ActionButtonProps = Pick<TrueButtonProps & IconProps, "children" | "disabled" | "onClick" | "icon">

function ActionButton({ children, ...props }: ActionButtonProps) {
  return (
    <Button { ...props } ghost className="flex flex-col" iconProps={{ size: 96, strokeWidth: 3 }}>
      {children}
    </Button>
  )
}
