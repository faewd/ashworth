import { ClassValue } from "clsx"
import { Loader } from "lucide-react"
import cx from "@/lib/util/cx"

type SpinnerProps = {
  color?: "primary" | "secondary" | "error" | "warn" | "info" | "success";
  className?: ClassValue;
}

const spinnerColors = {
  "primary": "text-indigo-300",
  "secondary": "text-zinc-500",
  "error": "text-rose-400",
  "warn": "text-amber-400",
  "info": "text-purple-300",
  "success": "text-emerald-400",
}

export default function Spinner({ className, color }: SpinnerProps) {
  const colorClasses = spinnerColors[color ?? "secondary"]
  return <Loader className={cx("animate-[spin_2s_linear_infinite] text-zinc-500", colorClasses, className)} />
}
