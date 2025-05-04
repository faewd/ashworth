import Checkbox from "@/lib/components/Checkbox"
import TextInput from "@/lib/components/TextInput"
import { Patchable } from "@/lib/hooks/usePatchable"
import Output from "@/lib/components/Output"
import { ISheet, ResolvedAbilityScore, ResolvedAbilityScores } from "@/lib/sheet/sheet"
import Heading from "@/lib/components/Heading"

type AbilitiesTableProps = {
  abilityScores: ResolvedAbilityScores;
  patchable: Patchable<ISheet>;
  readonly: boolean;
}

export default function AbilitiesTable({ abilityScores, patchable, readonly }: AbilitiesTableProps) {

  const { patchCheckbox, patchNumeric } = patchable

  const entries = Object.entries(abilityScores) as [keyof ResolvedAbilityScores, ResolvedAbilityScore][]

  return (
    <section>
      <Heading rank={3}>Ability Scores</Heading>
      <table className="border-separate h-min w-full">
        <thead className="text-zinc-400">
          <tr>
            <th className="w-13 text-center text-sm">PROF</th>
            <th className="w-13 text-center text-sm">Ability</th>
            <th className="w-13 text-center text-sm">Base</th>
            <th className="w-13 text-center text-sm leading-4">Char. Bonus</th>
            <th className="w-13 text-center text-sm leading-4">Temp. Bonus</th>
            <th className="w-13 text-center text-zinc-300">Score</th>
            <th className="w-13 text-center text-zinc-300">Mod</th>
            <th className="w-13 text-center text-zinc-300">Save</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(([ability, { proficient, base, bonus, tempBonus, score, modifier, save }]) => (
            <tr key={ability}>
              <td className="text-center pt-1"><Checkbox checked={proficient} onChange={patchCheckbox((draft, value) => draft.abilityScores[ability].proficient = value)} readonly={readonly} /></td>
              <td className="text-center pt-1 uppercase font-bold">{ability}</td>
              <td className="text-center pt-1"><TextInput value={base} onChange={patchNumeric((draft, value) => draft.abilityScores[ability].base = value)} className="text-center w-12" readOnly={readonly} /></td>
              <td className="text-center pt-1 w-min"><TextInput value={bonus} onChange={patchNumeric((draft, value) => draft.abilityScores[ability].bonus = value)} className="text-center w-12" readOnly={readonly} /></td>
              <td className="text-center pt-1 w-min"><TextInput value={tempBonus} onChange={patchNumeric((draft, value) => draft.abilityScores[ability].tempBonus = value)} className="text-center w-12" readOnly={readonly} /></td>
              <td className="text-center pt-1"><Output value={score} className="w-12" /></td>
              <td className="text-center pt-1"><Output value={modifier} showSign className="w-12" /></td>
              <td className="text-center pt-1"><Output value={save} showSign className="w-12" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
