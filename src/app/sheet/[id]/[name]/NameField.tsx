"use client"

import Button from "@/lib/components/Button"
import Heading from "@/lib/components/Heading"
import TextInput from "@/lib/components/TextInput"
import { Save } from "lucide-react"
import { useState } from "react"

type NameFieldProps = {
  value: string;
  onChange: (value: string) => void;
  readonly: boolean;
}

export default function NameField({ value: initialValue, onChange, readonly }: NameFieldProps) {

  const [value, setValue] = useState(initialValue)
  const [editing, setEditing] = useState(false)

  function startEditing() {
    setEditing(true)
  }

  function save() {
    setEditing(false)
    onChange(value.trim())
  }

  if (editing && !readonly) {
    return (
      <div className="flex gap-1 items-center mb-1">
        <TextInput value={value} onChange={(e) => setValue(e.currentTarget.value)} autoFocus />
        <Button icon={Save} onClick={save} />
      </div>
    )
  }

  return <button onClick={startEditing} className="cursor-pointer hover:bg-indigo-300/20 -mx-2 px-2 rounded">
    <Heading rank={1}>{value}</Heading>
  </button>
}