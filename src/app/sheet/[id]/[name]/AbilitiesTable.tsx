import Checkbox from "@/lib/components/Checkbox"
import TextInput from "@/lib/components/TextInput"
import { Patchable } from "@/lib/hooks/usePatchable"
import Output from "@/lib/components/Output"
import { ISheet, ResolvedAbilityScore, ResolvedAbilityScores } from "@/lib/sheet/sheet"
import Heading from "@/lib/components/Heading"
import { ReactNode } from "react"
import { ClassValue } from "clsx"
import cx from "@/lib/util/cx"

type AbilitiesTableProps = {
  abilityScores: ResolvedAbilityScores;
  patchable: Patchable<ISheet>;
  readonly: boolean;
}

export default function AbilitiesTable({ abilityScores, patchable, readonly }: AbilitiesTableProps) {

  const { patchCheckbox, patchNumeric } = patchable

  const entries = Object.entries(abilityScores) as [keyof ResolvedAbilityScores, ResolvedAbilityScore][]

  const pointBuyValue = entries.reduce((acc, [_, ability]) => acc + Math.max(0, ability.base - 8) + Math.max(0, ability.base - 14) * 2, 0)
  const totalValue = entries.reduce((acc, [_, ability]) => acc + ability.base, 0)

  return (
    <section className="grow">
      <Heading rank={3} className="mb-2">Ability Scores</Heading>
      <table className="h-min w-full">
        <thead className="text-zinc-400">
          <tr>
            <th className="w-min text-center text-sm">PR</th>
            <th className="w-min text-center text-sm">Ability</th>
            <th className="w-min text-center text-sm">Base</th>
            <th className="w-min text-center text-sm leading-4">Char. Bonus</th>
            <th className="w-min text-center text-sm leading-4">Temp. Bonus</th>
            <th className="w-min text-center text-zinc-300">Score</th>
            <th className="w-min text-center text-zinc-300">Mod</th>
            <th className="w-min text-center text-zinc-300">Save</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(([ability, { proficient, base, bonus, tempBonus, score, modifier, save }]) => (
            <tr key={ability} className="group">
              <TableCell className="pl-2 rounded-l"><Checkbox checked={proficient} onChange={patchCheckbox((draft, value) => draft.abilityScores[ability].proficient = value)} readonly={readonly} /></TableCell>
              <TableCell className="px-3 uppercase font-bold">{ability}</TableCell>
              <TableCell className="w-min min-w-14"><TextInput value={base} onChange={patchNumeric((draft, value) => draft.abilityScores[ability].base = value)} className="text-center" readOnly={readonly} /></TableCell>
              <TableCell className="w-min min-w-14"><TextInput value={bonus} onChange={patchNumeric((draft, value) => draft.abilityScores[ability].bonus = value)} className="text-center" readOnly={readonly} /></TableCell>
              <TableCell className="w-min min-w-14"><TextInput value={tempBonus} onChange={patchNumeric((draft, value) => draft.abilityScores[ability].tempBonus = value)} className="text-center" readOnly={readonly} /></TableCell>
              <TableCell><Output value={score} className="w-full transition-colors group-hover:bg-indigo-400/25"  /></TableCell>
              <TableCell><Output value={modifier} showSign className="w-full transition-colors group-hover:bg-indigo-400/25"  /></TableCell>
              <TableCell className="rounded-r"><Output value={save} showSign className="w-full transition-colors group-hover:bg-indigo-400/25" /></TableCell>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-1 mx-1">
        <div className="flex gap-4 text-zinc-500 rounded py-2 px-3 bg-zinc-500/5">
          <div>Total: <span className="font-semibold">{totalValue}</span></div>
          <div>Point Buy: <span className="font-semibold">{pointBuyValue}</span>/27</div>
        </div>
      </div>
    </section>
  )
}

function TableCell({ className, children }: { className?: ClassValue; children: ReactNode }) {
  return <td className={cx("text-center p-1 transition-colors group-hover:bg-zinc-800", className)}>{children}</td>
}
