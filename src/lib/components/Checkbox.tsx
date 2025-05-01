import { cloneElement, JSX } from "react"
import cx from "../util/cx"

type CheckboxProps = Omit<JSX.IntrinsicElements["input"] & { type: "text" }, "type">
  & { label?: string }

const checkboxClasses = "appearance-none w-[1em] aspect-square bg-zinc-800 rounded-sm cursor-pointer align-middle checked:bg-indigo-300"

export default function Checkbox({ className, label, ...props }: CheckboxProps) {
  const input = <input type="checkbox" {...props} />

  if (label === undefined) {
    return cloneElement(input, { className: cx(checkboxClasses, className) });
  }

  return (
    <label className={cx("flex gap-2 items-center", className)}>
      {cloneElement(input, { className: checkboxClasses })}
      <span className="font-semibold">{label}</span>
    </label>
  )
}
