import { ClassValue } from "clsx"
import cx from "../util/cx"

type OutputProps = {
    value: number | string;
    showSign?: boolean;
    className?: ClassValue;
  }

export default function Output({ value, showSign, className }: OutputProps) {
  const signedValue = typeof value === "number" && showSign
    ? (value > 0 ? "+" : "") + value
    : value
  return <output className={cx("rounded bg-indigo-300/10 font-semibold text-indigo-300 text-center px-2 py-1 text-lg inline-block min-w-12", className)}>{signedValue}</output>
}