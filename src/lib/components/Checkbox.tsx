import { cloneElement, JSX, ReactNode } from "react"
import cx from "../util/cx"

type CheckboxProps = Omit<JSX.IntrinsicElements["input"] & { type: "text" }, "type" | "readOnly">
  & {
    label?: ReactNode;
    readonly?: boolean;
  }

const checkboxClasses = "appearance-none w-[1em] aspect-square bg-zinc-800 rounded-sm cursor-pointer align-middle checked:bg-indigo-300"
const readonlyClasses = "inline-block cursor-default [&[data-checked='true']]:bg-indigo-300"

export default function Checkbox({ className, label, readonly, ...props }: CheckboxProps) {
  const input = readonly
    ? <div data-checked={props.checked} />
    : <input type="checkbox" {...props} />

  if (label === undefined) {
    return cloneElement(input, { className: cx(checkboxClasses, { [readonlyClasses]: readonly }, className) })
  }

  return (
    <label className={cx("flex gap-2 items-center whitespace-nowrap", className)}>
      {cloneElement(input, { className: checkboxClasses })}
      <span className="font-semibold">{label}</span>
    </label>
  )
}
