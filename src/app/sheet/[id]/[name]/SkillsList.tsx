import { Patchable } from "@/lib/hooks/usePatchable"
import Output from "@/lib/components/Output"
import { ISheet, ResolvedSkill, ResolvedSkills } from "@/lib/sheet/sheet"
import { skills as skillData } from "@/lib/data/skills"
import Heading from "@/lib/components/Heading"
import TristateCheckbox from "@/lib/components/TristateCheckbox"

type SkillsListProps = {
  skills: ResolvedSkills;
  patchable: Patchable<ISheet>;
  readonly: boolean;
}

export default function SkillsList({ skills, patchable, readonly }: SkillsListProps) {

  const { patch } = patchable

  const entries = Object.entries(skills) as [keyof ResolvedSkills, ResolvedSkill][]

  return (
    <div>
      <Heading rank={3}>Skills</Heading>
      <div className="grid grid-cols-2 gap-x-6 gap-y-1">
        {entries.map(([skill, data]) => (
          <div key={skill} className="flex justify-between items-center">
            <TristateCheckbox 
              value={data.proficiency}
              onChange={patch((draft, value) => draft.skills[skill].proficiency = value)}
              label={
                <>
                  {skillData[skill].name}
                  <span className="text-xs align-middle text-zinc-500 ml-1 tracking-tighter uppercase">
                    ({skillData[skill].baseAbility})
                  </span>
                </>
              }
              readonly={readonly}
            />
            <Output value={data.modifier} showSign className="shrink-0 grow-0 ml-2" />
          </div>
        ))}
      </div>
    </div>
  )
}