import type { ClassValue } from "clsx"
import type { ReactNode } from "react"
import cx from "@/lib/util/cx"
import { LucideIcon, LucideProps } from "lucide-react"

type BaseButtonProps = {
  color?: "primary" | "secondary" | "error" | "warn" | "info" | "success"
  ghost?: boolean
  disabled?: boolean
  className?: ClassValue
} & (
  | { children: ReactNode }
  | IconProps
)

export type IconProps = {
  children?: ReactNode;
  icon: LucideIcon;
  iconProps?: Partial<Omit<LucideProps, "icon">>
}

export type ButtonProps = LinkButtonProps | TrueButtonProps | SubmitButtonProps

export type LinkButtonProps = BaseButtonProps & {
  href: string
  newTab?: boolean
}

export type TrueButtonProps = BaseButtonProps & {
  onClick: () => void;
}

export type SubmitButtonProps = BaseButtonProps & {
  submit: true
}

const btnColors = {
  "primary": "bg-indigo-400 hover:bg-indigo-300",
  "secondary": "bg-zinc-700 hover:bg-zinc-600",
  "error": "bg-rose-500 hover:bg-rose-400",
  "warn": "bg-amber-500 hover:bg-amber-400",
  "info": "bg-purple-400 hover:bg-purple-300",
  "success": "bg-emerald-600 hover:bg-emerald-500",
  "disabled": "bg-zinc-700 hover:bg-zinc-700 text-zinc-400 cursor-not-allowed",
}

const ghostColors = {
  "primary": "text-indigo-300 hover:text-indigo-200 hover:bg-indigo-300/15",
  "secondary": "text-zinc-500 hover:text-zinc-400 hover:bg-zinc-500/15",
  "error": "text-rose-400 hover:text-rose-300 hover:bg-rose-400/15",
  "warn": "text-amber-400 hover:text-amber-300 hover:bg-amber-400/15",
  "info": "text-purple-300 hover:text-purple-200 hover:bg-purple-400/15",
  "success": "text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/15",
  "disabled": "text-zinc-600 cursor-not-allowed",
}

function isLinkButtonProps(props: ButtonProps): props is LinkButtonProps {
  return Object.hasOwn(props, "href")
}

function isSubmitButtonProps(props: ButtonProps): props is SubmitButtonProps {
  return Object.hasOwn(props, "submit")
}

function isIconButtonProps(props: ButtonProps): props is ButtonProps & IconProps {
  return Object.hasOwn(props, "icon")
}

export default function Button(props: ButtonProps) {
  const isLink = isLinkButtonProps(props)
  const B = isLink ? "a" : "button"

  const isSubmit = isSubmitButtonProps(props)

  const bProps = isLink
    ? {
        href: props.href,
        target: props.newTab ? "_blank" : "_self",
      } as const
    : isSubmit
      ? {
          type: "submit",
        } as const
      : {
          onClick: props.onClick,
          type: "button",
        } as const

  const hasIcon = isIconButtonProps(props)

  const colors = props.ghost ? ghostColors : btnColors
  const colorClasses = colors[props.disabled ? "disabled" : (props.color ?? "primary")]

  return <B {...bProps} className={cx("flex gap-2 items-center justify-center rounded py-1 px-2 text-zinc-50 font-semibold cursor-pointer transition-colors", colorClasses, { "p-2": hasIcon && !props.children }, props.className)}>
    {hasIcon
      ? <>
          <props.icon {...Object.assign({}, { absoluteStrokeWidth: true, strokeWidth: 2.5, size: 16 }, props.iconProps ?? {})} />
          {props.children && <span>{props.children}</span>}
        </>
      : props.children
    }
    
  </B>
}
