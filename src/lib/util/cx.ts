import { twMerge } from "tailwind-merge"
import clsx, { ClassValue } from "clsx"

export default function cx(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
