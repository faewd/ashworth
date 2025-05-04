import { AbilityScore, AbilityScores, CharacterClass, ICharacter, Skill, Skills } from "@/lib/models/character"
import { IUser } from "@/lib/models/user"
import { skills } from "@/lib/data/skills"

export type ResolvedAbilityScore = AbilityScore & {
  totalBonus: number;
  score: number;
  modifier: number;
  save: number;
}

export type ResolvedAbilityScores = {
  [key in keyof AbilityScores]: ResolvedAbilityScore
}

export type ResolvedSkill = Skill & {
  baseModifer: number;
  modifier: number;
  passive: number;
}

export type ResolvedSkills = {
  [key in keyof Skills]: ResolvedSkill
}

export interface ISheet extends ICharacter {
  proficiencyBonus: number;
  class: string;
  level: number;
  abilityScores: ResolvedAbilityScores;
  skills: ResolvedSkills;
  stats: Record<string, number>;
}

export class Sheet implements ISheet {
  constructor(
    public readonly data: ICharacter,
  ) {}

  get id(): string {
    return this.data.id
  }

  get owner(): IUser {
    return this.data.owner
  }

  get publiclyVisible(): boolean {
    return this.data.publiclyVisible
  }

  get name(): string {
    return this.data.name
  }

  get species(): string {
    return this.data.species
  }

  get class(): string {
    return this.data.classes.map((c) => `${c.class} ${c.level}`).join(" / ")
  }

  get classes(): CharacterClass[] {
    return this.data.classes
  }

  get background(): string {
    return this.data.background
  }

  get level(): number {
    return this.data.classes.map(c => c.level).reduce((acc, cur) => acc + cur)
  }

  get proficiencyBonus(): number {
    return Math.ceil(this.level / 4 + 1)
  }

  get abilityScores(): ResolvedAbilityScores {
    const entries = Object.entries(this.data.abilityScores) as (readonly [keyof AbilityScores, AbilityScore])[]
    const resolved = entries.map(([ability, data]) => {
      const { base, bonus, tempBonus, proficient } = data
      const totalBonus = bonus + tempBonus
      const score = base + bonus + tempBonus
      const modifier = Math.floor((score - 10) / 2)
      const save = modifier + (proficient ? this.proficiencyBonus : 0)
      return [ability, {
        ...data,
        totalBonus,
        score,
        modifier,
        save,
      }]
    })
    return Object.fromEntries(resolved)
  }

  get skills(): ResolvedSkills {
    const entries = Object.entries(this.data.skills) as (readonly [keyof Skills, Skill])[]
    const abilities = this.abilityScores
    const resolved = entries.map(([skillId, { tempBonus, proficiency }]) => {
      const skill = skills[skillId]
      const baseModifier = abilities[skill.baseAbility].modifier
      const modifier = baseModifier + tempBonus + (this.proficiencyBonus * proficiency)

      return [skillId, {
        proficiency,
        tempBonus,
        base: baseModifier,
        modifier,
        passive: 10 + modifier,
      }]
    })

    return Object.fromEntries(resolved)
  }

  get stats(): Record<string, number> {
    return {
      "PB": this.proficiencyBonus,
      "LEVEL": this.level,
      "LVL": this.level,
      ...this.getAbilityStats(),
      ...this.getSkillStats(),
    }
  }

  private getAbilityStats(): Record<string, number> {
    const entries = Object.entries(this.abilityScores)
    const flat = entries
      .map(([ability, data]) => [ability.toUpperCase(), data] as const)
      .flatMap(([ability, a]) => [
        [`${ability}.BASE`, a.base],
        [`${ability}.BONUS`, a.totalBonus],
        [`${ability}.SCORE`, a.score],
        [`${ability}.SAVE`, a.save],
        [ability, a.modifier],
      ])
    return Object.fromEntries(flat)
  }

  private getSkillStats(): Record<string, number> {
    const entries = Object.entries(this.skills)
    const flat = entries
      .map(([skill, data]) => [skill.toUpperCase(), data] as const)
      .flatMap(([skill, s]) => [
        [`${skill}.BASE`, s.baseModifer],
        [`${skill}.BONUS`, s.tempBonus],
        [`${skill}.PASSIVE`, s.passive],
        [`${skill}.PB`, s.proficiency * this.proficiencyBonus],
        [skill, s.modifier],
      ])
    return Object.fromEntries(flat)
  }

  public toJSON(): ISheet {
    return {
      id: this.id,
      name: this.name,
      owner: {
        id: this.owner.id,
        name: this.owner.name,
        picture: this.owner.picture,
      },
      publiclyVisible: this.publiclyVisible,
      species: this.species,
      class: this.class,
      classes: this.classes,
      background: this.background,
      level: this.level,
      proficiencyBonus: this.proficiencyBonus,
      abilityScores: this.abilityScores,
      skills: this.skills,
      stats: this.stats,
    }
  }
}