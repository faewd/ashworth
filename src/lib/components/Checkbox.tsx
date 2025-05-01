import { JSX } from "react"
import cx from "../util/cx"

type CheckboxProps = Omit<JSX.IntrinsicElements["input"] & { type: "text" }, "type">

export default function Checkbox({ className, ...props }: CheckboxProps) {
  return <input type="checkbox" {...props} className={cx("appearance-none w-[1em] aspect-square bg-zinc-800 rounded-sm cursor-pointer align-middle checked:bg-indigo-300", className)} />
}
