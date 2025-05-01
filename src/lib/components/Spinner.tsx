import { ClassValue } from "clsx"
import { Loader } from "lucide-react"
import cx from "@/lib/util/cx"

type SpinnerProps = {
  color?: "primary" | "secondary" | "error" | "warn" | "info" | "success";
  className?: ClassValue
}

const spinnerColors = {
  "primary": "text-indigo-500",
  "secondary": "text-zinc-500",
  "error": "text-rose-500",
  "warn": "text-amber-500",
  "info": "text-sky-500",
  "success": "text-emerald-500",
}

export default function Spinner({ className, color }: SpinnerProps) {
  const colorClasses = spinnerColors[color ?? "secondary"]
  return <Loader className={cx("animate-[spin_2s_linear_infinite] text-zinc-500", colorClasses, className)} />
}
