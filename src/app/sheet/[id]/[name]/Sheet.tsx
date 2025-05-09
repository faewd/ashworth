"use client"

import { ICharacter } from "../../../../lib/models/character"
import Image from "next/image"
import InputGroup from "../../../../lib/components/InputGroup"
import TextInput from "../../../../lib/components/TextInput"
import usePatchable from "@/lib/hooks/usePatchable"
import AbilitiesTable from "./AbilitiesTable"
import { useCallback, useEffect, useState } from "react"
import { Clipboard, ClipboardCheck, CloudAlert, Pencil, Trash, TriangleAlert } from "lucide-react"
import Spinner from "@/lib/components/Spinner"
import Checkbox from "@/lib/components/Checkbox"
import Button from "@/lib/components/Button"
import NameField from "./NameField"
import { ISheet, Sheet } from "@/lib/sheet/sheet"
import SkillsList from "./SkillsList"
import Heading from "@/lib/components/Heading"
import { useModal } from "@/lib/context/modalContext"
import DeleteModal from "@/lib/components/DeleteModal"
import Output from "@/lib/components/Output"
import ClassLevelsModal from "./ClassLevelsModal"

type SheetProps = {
  character: ISheet;
  readonly: boolean;
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

  const { data, patch, patchText, patchCheckbox } = patchable
 
  const modal = useModal()

  useEffect(() => {
    modal.closeAll()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    if (readonly) return
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
        else if (typeof err.error === "string") setError(err.error)
        else setError("An unexpected error ocurred :(")
        setSaving(false)
      })
  }, 2500), [])

  useEffect(() => {
    save(data)
  }, [data, save])

  function showClassLevelsModal() {
    modal.show(<ClassLevelsModal classes={sheet.classes} onChange={patch((draft, value) => draft.classes = value)} />, "Edit Class Levels")
  }

  return (
    <div className="flex justify-center px-4">
      <article className="pt-8 max-w-[960px]">
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
        <section className="grid grid-cols-[min-content_repeat(3,1fr)] gap-2 mt-8">
          <InputGroup label="Level">
            <Output className="w-12 text-center" value={sheet.level} />
          </InputGroup>
          <InputGroup label="Species">
            <TextInput value={sheet.species} onChange={patchText((draft, value) => draft.species = value)} readOnly={readonly} />
          </InputGroup>
          <InputGroup label="Class">
            <button onClick={showClassLevelsModal} className="group flex items-center justify-between w-full cursor-pointer text-left bg-zinc-950 px-2 py-1 border-2 border-transparent rounded hover:bg-zinc-950/50 hover:text-indigo-300">
              {sheet.class}
              <Pencil className="hidden group-hover:block" size={18} strokeWidth={2.75} />
            </button>
          </InputGroup>
          <InputGroup label="Background">
            <TextInput value={sheet.background} onChange={patchText((draft, value) => draft.background = value)} readOnly={readonly} />
          </InputGroup>
        </section>
        <section className="mt-6 md:flex w-full justify-between gap-8">
          <AbilitiesTable abilityScores={sheet.abilityScores} patchable={patchable} readonly={readonly} />
          <SkillsList skills={sheet.skills} patchable={patchable} readonly={readonly} />
        </section>
        {readonly || (
          <section className="mt-2">
            <Heading rank={3} className="text-rose-300 mb-4">Danger Zone</Heading>
            <div className="flex items-center gap-4 p-2 px-4 rounded bg-rose-950/20 max-w-[60ch] text-rose-300">
              <Button onClick={() => {modal.show(<DeleteModal char={character} />, "Delete Character")}} color="error" icon={Trash}>Delete</Button>
              This action is irreversible. If you have synchronised this sheet with Miniroll, you will no longer be able to use its stats in rolls.
            </div>
          </section>
        )}
      </article>
    </div>
  )
}
