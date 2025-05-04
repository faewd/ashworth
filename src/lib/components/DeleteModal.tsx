"use client"

import { FormEvent, useEffect, useState } from "react"
import { useModal } from "../context/modalContext"
import { ICharacter } from "../models/character"
import Button from "./Button"
import TextInput from "./TextInput"
import { useRouter } from "next/navigation"
import Spinner from "./Spinner"
import Alert from "./Alert"

export default function DeleteModal({ char }: { char: ICharacter }) {

  const modal = useModal()
  const router = useRouter()

  const [name, setName] = useState("")
  const [valid, setValid] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setValid(name.toLowerCase() === char.name.toLowerCase())
  }, [char.name, name, setValid])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!valid) return
    setIsDeleting(true)
    fetch(`/api/characters/${char.id}`, { method: "DELETE" })
      .then(async res => {
        if (!res.ok) throw await res.text()
        setError(null)
        router.replace("/")
        modal.closeAll()
      })
      .catch(err => {
        if (err instanceof Error) setError(err.message)
        else if (typeof err === "string" && err.length) setError(err)
        else setError("An unexpected error occurred :(")
      })
      .finally(() => {
        setIsDeleting(false)
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-2">Are you sure you want to delete the character sheet for <span className="font-semibold text-rose-400">{char.name}</span>?</p>
      <p className="mb-4">Type the name of the character in the box below to confirm.</p>
      <TextInput value={name} onChange={e => setName(e.currentTarget.value)} />
      <div className="flex justify-end gap-2 mt-4">
        <Button onClick={() => modal.closeAll()} ghost color="secondary">Cancel</Button>
        <Button submit color="error" disabled={!valid || isDeleting}>
          {isDeleting
            ? <Spinner />
            : "Delete"
          }
        </Button>
      </div>
      { error && <Alert color="error" className="mt-4">{error}</Alert> }
    </form>
  )
}