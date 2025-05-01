import { ClassValue } from "clsx"
import { ReactNode } from "react"
import cx from "../util/cx"

type AlertProps = {
  color?: "primary" | "secondary" | "error" | "warn" | "info" | "success",
  className?: ClassValue,
  children: ReactNode
}

const alertColors = {
  "primary": "text-indigo-500 bg-indigo-600/15",
  "secondary": "text-zinc-500 bg-zinc-500/15",
  "error": "text-rose-500 bg-rose-500/15",
  "warn": "text-amber-500 bg-amber-500/15",
  "info": "text-sky-500 bg-sky-500/15",
  "success": "text-emerald-500 bg-emerald-500/15",
}

export default function Alert({ color, className, children }: AlertProps) {

  const colorClasses = alertColors[color ?? "primary"]

  return <div className={cx("p-2 rounded", colorClasses, className)}>{children}</div>
}