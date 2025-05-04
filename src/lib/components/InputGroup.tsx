import { ReactNode } from "react"

type InputGroupProps = {
  label: string;
  children: ReactNode;
}

export default function InputGroup({ label, children }: InputGroupProps) {
  return (
    <label>
      <div className="font-semibold ps-[2px]">{label}</div>
      {children}
    </label>
  )
}
