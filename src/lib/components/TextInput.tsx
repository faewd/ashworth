import { JSX } from "react"
import cx from "../util/cx"

type TextInputProps = Omit<JSX.IntrinsicElements["input"] & { type: "text" }, "type">

export default function TextInput({ className, ...props }: TextInputProps) {
  return <input
    type="text"
    {...props}
    className={cx(
      "bg-zinc-950 rounded-sm px-2 py-1 w-full border-2 border-zinc-950 outline-[0] outline-indigo-500/20 transition-all",
      {
        "pointer-events-none focus:outline-none": props.readOnly,
        "focus:outline-4 focus:outline-indigo-500/20 focus:border-indigo-800": !props.readOnly,
      },
      className,
    )}
  />
}
