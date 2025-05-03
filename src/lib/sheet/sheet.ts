import { AbilityScore, AbilityScores, ICharacter } from "../models/character";
import { IUser } from "../models/user";

type ResolvedAbilityScores = {
  [key in keyof AbilityScores]: AbilityScore & {
    totalBonus: number;
    score: number;
    modifier: number;
    save: number;
  }
}

export class Sheet implements ICharacter {
  constructor(
    public readonly data: ICharacter
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
    return this.data.class
  }

  get level(): number {
    return this.data.level
  }

  get proficiencyBonus(): number {
    return Math.ceil(this.data.level / 4 + 1)
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
        save
      }]
    })
    return Object.fromEntries(resolved)
  }

  private getStatRecord(): Record<string, number> {
    return {
      "PB": this.proficiencyBonus,
      "LEVEL": this.level,
      "LVL": this.level,
      ...this.getAbilityStats()
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

  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      owner: {
        id: this.owner.id,
        name: this.owner.name,
        picture: this.owner.picture
      },
      publiclyVisible: this.publiclyVisible,
      species: this.species,
      class: this.class,
      level: this.level,
      proficiencyBonus: this.proficiencyBonus,
      abilityScores: this.abilityScores,
      stats: this.getStatRecord()
    }
  }
}