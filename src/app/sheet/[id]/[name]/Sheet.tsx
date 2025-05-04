"use client"

import { ICharacter } from "../../../../lib/models/character"
import Image from "next/image"
import InputGroup from "../../../../lib/components/InputGroup"
import TextInput from "../../../../lib/components/TextInput"
import usePatchable from "@/lib/hooks/usePatchable"
import AbilitiesTable from "./AbilitiesTable"
import { useCallback, useEffect, useState } from "react"
import { Clipboard, ClipboardCheck, CloudAlert, TriangleAlert } from "lucide-react"
import Spinner from "@/lib/components/Spinner"
import Checkbox from "@/lib/components/Checkbox"
import Button from "@/lib/components/Button"
import NameField from "./NameField"
import { ISheet, Sheet } from "@/lib/sheet/sheet"

type SheetProps = {
  character: ISheet,
  readonly: boolean
}

function debounce<T extends unknown[]>(f: (...args: T) => void, duration: number) {
  let timeout: ReturnType<typeof setTimeout> | null

  return (...args: T) => {
    if (timeout !== null) clearTimeout(timeout)
    timeout = setTimeout(() => {
      timeout = null
      f(...args)
    }, duration)
  }
 
}

export default function SheetComponent({ character, readonly }: SheetProps) {

  const [sheet, setSheet] = useState(new Sheet(character))
  const patchable = usePatchable(character, (newData) => {
    setSheet(new Sheet(newData))
    setModified(true)
  })

  const { data, patch, patchText, patchNumeric, patchCheckbox } = patchable
 
  const [hasCopiedId, setHasCopiedId] = useState(false)

  function copyId() {
    navigator.clipboard.writeText(character.id)
    setHasCopiedId(true)
    setTimeout(() => setHasCopiedId(false), 5000)
  }

  const [isModified, setModified] = useState(false)
  const [isSaving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const save = useCallback(debounce((data: ICharacter) => {
    if (readonly) return;
    setSaving(true)
    fetch(`/api/characters/${sheet.id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
      .then(async res => {
        if (res.ok) return res.json()
        throw await res.json()
      })
      .then((newData) => {
        window.history.replaceState(null, "", `/sheet/${sheet.id}/${newData.name}`)
        setError(null)
        setModified(false)
        setTimeout(() => setSaving(false), 1000)
      })
      .catch(err => {
        console.error(err)
        if (err instanceof Error) setError(err.message)
        else if (typeof err === "string") setError(err)
        else setError("An unexpected error ocurred :(")
        setSaving(false)
      })
  }, 2500), [])

  useEffect(() => {
    save(data)
  }, [data, save])

  return (
    <div className="flex justify-center">
      <article className="pt-8">
        <section>
          <div className="flex items-center">
            <NameField value={sheet.name} onChange={patch((draft, value) => draft.name = value)} readonly={readonly} />
            <span className="text-xs font-semibold mt-2 rounded-sm bg-zinc-800 text-zinc-400 ms-4 px-1 py-px">{sheet.id}</span>
            <Button onClick={copyId} icon={hasCopiedId ? ClipboardCheck : Clipboard} color={hasCopiedId ? "success" : "primary"} ghost className="ml-1 mt-1" />
            { hasCopiedId && <span className="text-sm font-bold text-emerald-500 ml-2 mt-1">Copied ID to Clipboard</span> }
            {!readonly && (
              <div className="ml-auto">
                { error ? <div className="text-rose-800 font-bold text-sm flex gap-2 items-center rounded-sm px-2 py-1 bg-rose-300"><TriangleAlert /> {error}</div>
                  : isSaving ? <span className="text-zinc-400 flex gap-2 items-center font-bold text-sm"><Spinner /> Saving changes...</span>
                  : isModified ? <span className="text-rose-400 flex gap-2 items-center font-bold text-sm"><CloudAlert /> Unsaved changes</span>
                  : null
                }
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 w-full">
            <Image src={sheet.owner.picture ?? `https://placehold.co/48x48?text=${sheet.owner.name?.charAt(0)}`} alt="Your profile picture" width={24} height={24} className="rounded-lg" />
            <span>{sheet.owner.name}</span>
            {!readonly && <Checkbox label="Public?" checked={sheet.publiclyVisible} onChange={patchCheckbox((draft, value) => draft.publiclyVisible = value)} className="ml-auto" />}
          </div>
        </section>
        <section className="grid grid-cols-3 gap-2 mt-8">
          <InputGroup label="Species">
            <TextInput value={sheet.species} onChange={patchText((draft, value) => draft.species = value)} readOnly={readonly} />
          </InputGroup>
          <InputGroup label="Class">
            <TextInput value={sheet.class} onChange={patchText((draft, value) => draft.class = value)} readOnly={readonly} />
          </InputGroup>
          <InputGroup label="Level">
            <TextInput value={sheet.level} onChange={patchNumeric((draft, value) => draft.level = value)} readOnly={readonly} />
          </InputGroup>
        </section>
        <section className="mt-6 grid grid-cols-2">
          <AbilitiesTable abilityScores={sheet.abilityScores} patchable={patchable} readonly={readonly} />
        </section>
      </article>
    </div>
  )
}
