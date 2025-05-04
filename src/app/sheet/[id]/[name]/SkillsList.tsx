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
      <Heading rank={3} className="mt-4 sm:mt-0">Skills</Heading>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-[repeat(2,min-content)] gap-x-10 md:gap-x-6 gap-y-1">
        {entries.map(([skill, data]) => (
          <div key={skill} className="group flex justify-between items-center rounded transition-colors hover:bg-zinc-800 -ml-2 pl-2">
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
            <Output value={data.modifier} showSign className="shrink-0 grow-0 ml-2 transition-colors group-hover:bg-indigo-400/25" />
          </div>
        ))}
      </div>
    </div>
  )
}