interface BaseStats {
  health: number; // between 100 ~ 200
  speed: number; // between 0.1 ~ 1
  damage: number; // between 10 ~ 50
  armor: number; // between 0 ~ 20
  regeneration: number; // between 0 ~ 10
  resistance: Resistance;
}

type BaseStatsRawKey = Exclude<keyof BaseStats, "resistance">;
interface BonusStats extends Partial<BaseStats> {
  resistance?: Partial<Resistance>;
  healthMultiplier?: number;
  damageMultiplier?: number;
}

type DamageType = "physical" | "poison" | "lightning" | "cold" | "fire";

interface Resistance {
  debuff: number; // between -25 ~ 25
  stun: number; // between -25 ~ 25
  fire: number; // between -25 ~ 25
  cold: number; // between -25 ~ 25
  lightning: number; // between -25 ~ 25
  poison: number; // between -25 ~ 25
  physical: number; // between 0 ~ 10
}

interface ResourceState {
  type: string;
  icon: string;
}

interface Buff extends BonusStats {
  id: string;
  duration: number;
  isNegative: boolean;
  isDispellable: boolean;
}

interface Proc {
  label: string;
  chance: number;
  fn: () => void;
}
