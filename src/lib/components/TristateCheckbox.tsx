import { cloneElement, ReactNode } from "react"
import cx from "../util/cx"
import { ClassValue } from "clsx"

type Trit = 0 | 1 | 2

type TristateCheckboxProps = {
  value: Trit;
  onChange: (value: Trit) => void;
  label?: ReactNode;
  readonly?: boolean;
  className?: ClassValue;
}

export default function TristateCheckbox({ value, onChange, label, className, readonly }: TristateCheckboxProps) {

  function handleClick() {
    onChange((value + 1) % 3 as Trit)
  }

  const classes = cx(
    "appearance-none w-[1em] aspect-square bg-zinc-800 rounded-sm cursor-pointer align-middle",
    {
      ["inline-block cursor-default"]: readonly,
      ["bg-indigo-300"]: value === 1, 
      ["bg-purple-300 rotate-45"]: value === 2, 
    },
  )

  const button = <button onClick={handleClick} title={["Not proficient", "Proficient", "Expert"][value]} />

  if (label === undefined) {
    return cloneElement(button, { className: cx(classes, className) })
  }

  return (
    <label className={cx("flex gap-2 items-center whitespace-nowrap", className)}>
      {cloneElement(button, { className: classes })}
      <span className="font-semibold">{label}</span>
    </label>
  )
}
