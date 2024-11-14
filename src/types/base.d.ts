interface BaseStats {
  health: number; // between 100 ~ 200
  speed: number; // between 0.1 ~ 1
  damage: number; // between 10 ~ 50
  armor: number; // between 0 ~ 20
  regenation: number; // between 0 ~ 10
  resistance: Resistance;
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

interface BuffBase {
  // buff base can only consist of one of the stats below
  speed?: number;
  armor?: number;
  damage?: number;
  resistance?: Partial<Resistance>;
}

interface Buff extends BuffBase {
  duration: number;
}
interface Debuff extends BuffBase {
  duration: number;
  isDispellable: boolean;
}

interface Proc {
  label: string;
  chance: number;
  fn: () => void;
}
