import { Draft, enablePatches, produceWithPatches } from "immer"
import { ChangeEvent, useMemo, useState } from "react"

enablePatches()

type PatcherMaker<T> = <R>(f: PatchFunc<T, R>) => Patcher<R>
type PatchFunc<T, R> = (draft: Draft<T>, value: R) => void
type Patcher<R> = (value: R) => void

export type Patchable<T> = {
  data: T;
  patchOnce: (f: (draft: Draft<T>) => void) => void;
  patch: PatcherMaker<T>;
  patchText: (f: PatchFunc<T, string>) => Patcher<ChangeEvent<HTMLInputElement>>;
  patchCheckbox: (f: PatchFunc<T, boolean>) => Patcher<ChangeEvent<HTMLInputElement>>;
  patchNumeric: (f: PatchFunc<T, number>, fallback?: number) => Patcher<ChangeEvent<HTMLInputElement>>;
}

export default function usePatchable<T>(initialData: T, onChange?: (data: T) => void): Patchable<T> {
  const [data, setData] = useState<T>(initialData)

  const patchOnce = useMemo<(f: (draft: Draft<T>) => void) => void>(() => {
    return f => {
      const [next, patches] = produceWithPatches(data, draft => { f(draft) })
      if (patches.length > 0) {
        setData(next)
        onChange?.(next)
      }
    }
  }, [data, onChange])

  const patch: PatcherMaker<T> = f => value => patchOnce(draft => { f(draft, value) })

  const patchText = (f: PatchFunc<T, string>) => patch((draft, e: ChangeEvent<HTMLInputElement>) => f(draft, e.currentTarget.value))
  const patchCheckbox = (f: PatchFunc<T, boolean>) => patch((draft, e: ChangeEvent<HTMLInputElement>) => f(draft, e.currentTarget.checked))

  const patchNumeric = (f: PatchFunc<T, number>, fallback: number = 0) => patch((draft, e: ChangeEvent<HTMLInputElement>) => {
      const num = parseInt(e.target.value, 10)
      if (isNaN(num) && fallback === undefined) return
      f(draft, isNaN(num) ? fallback : num)
  })

  return { data, patchOnce, patch, patchText, patchCheckbox, patchNumeric }
}
