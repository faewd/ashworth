import { ClassValue } from "clsx"
import { ReactNode } from "react"
import cx from "@/lib/util/cx"

type HeadingProps = {
  rank: 1 | 2 | 3 | 4 | 5 | 6;
  className?: ClassValue;
  children: ReactNode;
}

const headingClasses = {
  "h1": "font-bold text-zinc-200 text-4xl",
  "h2": "font-bold text-zinc-200 text-3xl",
  "h3": "font-bold text-zinc-200 text-2xl",
  "h4": "font-bold text-zinc-200 text-xl",
  "h5": "font-bold text-zinc-200 text-lg",
  "h6": "font-bold text-zinc-200 text-md",
}
  
export default function Heading({ rank, className, children }: HeadingProps) {
  const H = `h${rank}` as const
  return (
    <H className={cx(headingClasses[H], className)}>{children}</H>
  )
}