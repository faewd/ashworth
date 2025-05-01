import { AbilityScore, AbilityScores } from "@/lib/models/character"
import Checkbox from "@/lib/components/Checkbox"
import TextInput from "@/lib/components/TextInput"
import usePatchable from "@/lib/hooks/usePatchable"

type AbilitiesTableProps = {
  abilityScores: AbilityScores;
  onChange: (next: AbilityScores) => void;
}

export default function AbilitiesTable({ abilityScores, onChange }: AbilitiesTableProps) {

  const { data, patchCheckbox, patchNumeric } = usePatchable(abilityScores, onChange)

  const entries = Object.entries(data) as [keyof AbilityScores, AbilityScore][]

  return (
    <table className="border-separate">
      <thead className="text-zinc-400">
        <tr>
          <th className="px-2 text-sm">PROF</th>
          <th className="px-2">Ability</th>
          <th className="px-2">Base</th>
          <th className="px-2 w-min leading-4">Char. Bonus</th>
          <th className="px-2 w-min leading-4">Temp. Bonus</th>
          <th className="px-2">Score</th>
          <th className="px-2">Save</th>
        </tr>
      </thead>
      <tbody>
        {entries.map(([ability, { proficient, base, bonus, tempBonus }]) => (
          <tr key={ability}>
            <td className="text-center pt-1"><Checkbox checked={proficient} onChange={patchCheckbox((draft, value) => draft[ability].proficient = value)} /></td>
            <td className="text-center pt-1 uppercase font-bold">{ability}</td>
            <td className="text-center pt-1"><TextInput value={base} onChange={patchNumeric((draft, value) => draft[ability].base = value)} className="text-center w-12" /></td>
            <td className="text-center pt-1 w-min"><TextInput value={bonus} onChange={patchNumeric((draft, value) => draft[ability].bonus = value)} className="text-center w-12" /></td>
            <td className="text-center pt-1 w-min"><TextInput value={tempBonus} onChange={patchNumeric((draft, value) => draft[ability].tempBonus = value)} className="text-center w-12" /></td>
            <td className="text-center pt-1 font-bold text-indigo-300">{base + bonus + tempBonus}</td>
            <td className="text-center pt-1 font-bold text-indigo-300">{Math.floor((base + bonus + tempBonus - 10) / 2) + (proficient ? 2 : 0)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
