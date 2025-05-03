import Checkbox from "@/lib/components/Checkbox"
import TextInput from "@/lib/components/TextInput"
import usePatchable from "@/lib/hooks/usePatchable"
import Output from "@/lib/components/Output"
import { ResolvedAbilityScore, ResolvedAbilityScores } from "@/lib/sheet/sheet"

type AbilitiesTableProps = {
  abilityScores: ResolvedAbilityScores;
  onChange: (next: ResolvedAbilityScores) => void;
}

export default function AbilitiesTable({ abilityScores, onChange }: AbilitiesTableProps) {

  const { data, patchCheckbox, patchNumeric } = usePatchable(abilityScores, onChange)

  const entries = Object.entries(data) as [keyof ResolvedAbilityScores, ResolvedAbilityScore][]

  return (
    <table className="border-separate">
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
            <td className="text-center pt-1"><Checkbox checked={proficient} onChange={patchCheckbox((draft, value) => draft[ability].proficient = value)} /></td>
            <td className="text-center pt-1 uppercase font-bold">{ability}</td>
            <td className="text-center pt-1"><TextInput value={base} onChange={patchNumeric((draft, value) => draft[ability].base = value)} className="text-center w-12" /></td>
            <td className="text-center pt-1 w-min"><TextInput value={bonus} onChange={patchNumeric((draft, value) => draft[ability].bonus = value)} className="text-center w-12" /></td>
            <td className="text-center pt-1 w-min"><TextInput value={tempBonus} onChange={patchNumeric((draft, value) => draft[ability].tempBonus = value)} className="text-center w-12" /></td>
            <td className="text-center pt-1"><Output value={score} className="w-12" /></td>
            <td className="text-center pt-1"><Output value={modifier} showSign className="w-12" /></td>
            <td className="text-center pt-1"><Output value={save} showSign className="w-12" /></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
