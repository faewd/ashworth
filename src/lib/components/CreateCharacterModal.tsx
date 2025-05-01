import { FormEvent, useState } from "react"
import { useModal } from "../context/modalContext"
import Button from "./Button"
import InputGroup from "./InputGroup"
import TextInput from "./TextInput"
import { ICharacter } from "../models/character"
import { useRouter } from "next/navigation"
import Spinner from "./Spinner"
import Alert from "./Alert"

export default function CreateCharacterModal() {

  const [name, setName] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const modal = useModal()
  const router = useRouter()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setIsCreating(true)
    fetch("/api/characters", {
      method: "POST",
      body: JSON.stringify({ name }),
    })
      .then(async res => {
        if (res.ok) return res.json() as Promise<ICharacter>
        throw await res.json()
      })
      .then(({ id, name }) => {
        router.push(`/sheet/${id}/${name}`)
        modal.closeAll()
      })
      .catch(err => {
        console.error(err)
        if (err instanceof Error) setError(err.message)
        else if (typeof err === "string") setError(err)
        else setError("An unexpected error ocurred :(")
      })
      .finally(() => {
        setIsCreating(false)
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup label="Character Name">
        <TextInput name="name" id="characterNameInput" value={name} onChange={e => setName(e.currentTarget.value)} disabled={isCreating} />
      </InputGroup>

      <div className="flex gap-2 justify-end mt-4">
        <Button onClick={modal.closeAll} color="secondary" ghost disabled={isCreating}>Cancel</Button>
        <Button submit disabled={isCreating}>{ isCreating ? <Spinner /> : "Create" }</Button>
      </div>

      {error && <Alert color="error" className="mt-4">{error}</Alert>}
    </form>
  )
}
