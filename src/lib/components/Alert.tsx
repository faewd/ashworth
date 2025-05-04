import { ClassValue } from "clsx"
import { ReactNode } from "react"
import cx from "../util/cx"

type AlertProps = {
  color?: "primary" | "secondary" | "error" | "warn" | "info" | "success";
  className?: ClassValue;
  children: ReactNode;
}

const alertColors = {
  "primary": "text-indigo-300 bg-indigo-300/15",
  "secondary": "text-zinc-400 bg-zinc-800",
  "error": "text-rose-400 bg-rose-400/15",
  "warn": "text-amber-400 bg-amber-400/15",
  "success": "text-emerald-500 bg-emerald-500/15",
  "info": "text-purple-300 bg-purple-400/15",
}

export default function Alert({ color, className, children }: AlertProps) {

  const colorClasses = alertColors[color ?? "primary"]

  return <div className={cx("p-2 rounded block font-semibold", colorClasses, className)}>{children}</div>
}