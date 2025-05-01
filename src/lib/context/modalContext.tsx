"use client"

import { createContext, ReactNode, useContext, useState } from "react"
import Button from "../components/Button"
import { MoveLeft, X } from "lucide-react"
import Heading from "../components/Heading"

type ModalState = {
  show(modal: ReactNode, title?: string): void;
  push(modal: ReactNode, title?: string): void;
  back(): void;
  closeAll(): void;
}

const ModalContext = createContext<ModalState>({
  show() {},
  push() {},
  back() {},
  closeAll() {},
})

export function useModal() {
  return useContext(ModalContext)
}

export function ModalProvider({ children }: { children: ReactNode }) {

  const [current, setCurrent] = useState<[ReactNode, string | undefined] | null>(null)
  const [stack, setStack] = useState<[ReactNode, string | undefined][]>([])

  function show(modal: ReactNode, title?: string) {
    setCurrent([modal, title])
  }

  function push(modal: ReactNode, title?: string) {
    setCurrent([modal, title])
    if (current !== null) setStack([...stack, current])
  }

  function back() {
    setCurrent(stack.at(-1) ?? null)
    setStack(stack.slice(0, stack.length - 1))
  }

  function closeAll() {
    setCurrent(null)
    setStack([])
  }

  const value = { show, push, closeAll, back }

  const [content, title] = current ?? [null, null]

  return <ModalContext.Provider value={value}>
    {children}
    {current && (
      <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-xs bg-zinc-950/50 flex items-center justify-center">
        <div className="bg-zinc-900 rounded-lg p-4">
          <div className="flex items-center mb-2 relative min-h-[1lh]">
            { stack.length > 0 && <Button onClick={back} color="secondary" icon={MoveLeft} ghost className="mr-8">Back</Button> }
            { title && <Heading rank={1} className="text-lg mt-[2px] mr-10">{title}</Heading>}
            <Button onClick={closeAll} icon={X} color="error" ghost className="rounded-full ml-auto"></Button>
          </div>
          {content}
        </div>
      </div>
    )}
  </ModalContext.Provider>
}
