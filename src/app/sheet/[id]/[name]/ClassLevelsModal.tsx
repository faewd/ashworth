import Button from "@/lib/components/Button"
import TextInput from "@/lib/components/TextInput"
import { useModal } from "@/lib/context/modalContext"
import usePatchable from "@/lib/hooks/usePatchable"
import { CharacterClass } from "@/lib/models/character"
import { Plus, Trash } from "lucide-react"

type ClassLevelsModalProps = {
  classes: CharacterClass[];
  onChange: (classes: CharacterClass[]) => void;
}

export default function ClassLevelsModal({ classes, onChange }: ClassLevelsModalProps) {

  const modal = useModal()
  const { data, patchText, patchNumeric, patchOnce } = usePatchable(classes)

  
  function addClass() {
    patchOnce((draft) => draft.push({ class: "", level: 1, subclass: "" }))
  }

  function deleteClass(idx: number) {
    if (data.length === 1) return
    patchOnce(draft => draft.splice(idx, 1))
  }

  function save() {
    modal.closeAll()
    onChange(data)
  }

  return <div>
    <div className="grid grid-cols-[repeat(4,min-content)] gap-x-2">
      <div className="font-bold text-lg ps-2">Class</div>
      <div className="font-bold text-lg text-center">Level</div>
      <div className="font-bold text-lg ps-2">Subclass</div>
      <div></div>
      {data.map((c, i) => (
        <>
          <TextInput key={`class-${i}`} value={c.class} onChange={patchText((draft, value) => draft[i].class = value)} className="mb-2 w-32" />
          <TextInput key={`level-${i}`} value={c.level} onChange={patchNumeric((draft, value) => draft[i].level = value)} className="mb-2 text-center w-16" />
          <TextInput key={`subclass-${i}`} value={c.subclass} onChange={patchText((draft, value) => draft[i].subclass = value)} className="mb-2 w-48" />
          <Button key={`delete-${i}`} onClick={() => deleteClass(i)} icon={Trash} ghost color="error" className="mb-2 w-9" disabled={data.length === 1} />
        </>
      ))}
    </div>

    <Button onClick={addClass} ghost className="w-full" icon={Plus}>Multiclass</Button>

    <div className="flex items-center justify-end mt-4 gap-2">
      <Button onClick={modal.closeAll} ghost color="secondary">Cancel</Button>
      <Button onClick={save}>Done</Button>
    </div>
  </div>
}