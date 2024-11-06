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
  duration: number;
  speed: number;
  armor: number;
  damage: number;
  resistance: Resistance;
}

interface Buff extends BuffBase {}
interface Debuff extends BuffBase {
  isDispellable: boolean;
}
