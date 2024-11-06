import { nanoid } from "nanoid";

export type EnemyEntity = ReturnType<typeof createEnemyEntity>;

export function createEnemyEntity(data: EnemyState) {
  const id = nanoid();
  let x = $state(Math.max(Math.random() * 90, 10));
  let y = $state(0);
  const buffs = $state<Buff[]>([]);
  const debuffs = $state<Debuff[]>([]);
  let health = $state(data.health);
  const armor = $derived(applyBonus("armor"));
  const speed = $derived(applyBonus("speed"));
  const damage = $derived(applyBonus("damage"));
  const resistance = $derived<Resistance>({
    fire: applyBonus("fire", "resistance"),
    cold: applyBonus("cold", "resistance"),
    lightning: applyBonus("lightning", "resistance"),
    poison: applyBonus("poison", "resistance"),
    debuff: applyBonus("debuff", "resistance"),
    stun: applyBonus("stun", "resistance"),
    physical: applyBonus("physical", "resistance"),
  });
  const hasArrived = $derived(y >= 100);

  type BuffKeys = Exclude<keyof BuffBase, "duration">;
  function applyBonus(
    key: Exclude<BuffKeys, "resistance"> | keyof Resistance,
    parentKey?: "resistance"
  ) {
    let final = (
      parentKey
        ? data[parentKey][key as keyof Resistance]
        : data[key as Exclude<BuffKeys, "resistance">]
    ) as number;
    let bonus = 0;

    for (const buff of buffs.filter((b) => key in b)) {
      bonus += parentKey
        ? buff[parentKey][key as keyof Resistance]
        : buff[key as Exclude<BuffKeys, "resistance">];
    }

    for (const debuff of debuffs.filter((b) => key in b)) {
      bonus -= parentKey
        ? debuff[parentKey][key as keyof Resistance]
        : debuff[key as Exclude<BuffKeys, "resistance">];
    }

    const multiplier = 1 + bonus / 100;
    final = final * Math.max(0.05, multiplier);

    return final;
  }

  return {
    get id() {
      return id;
    },
    get sprite() {
      return data.sprite;
    },
    get size() {
      return data.size;
    },
    get debuffs() {
      return debuffs;
    },
    get buffs() {
      return buffs;
    },
    get resistance() {
      return resistance;
    },
    get damage() {
      return damage;
    },
    get speed() {
      return speed;
    },
    get hasArrived() {
      return hasArrived;
    },
    get armor() {
      return armor;
    },
    get x() {
      return x;
    },
    set x(val: number) {
      x = val;
    },
    get y() {
      return y;
    },
    set y(val: number) {
      y = Math.min(val, 100);
    },
    get health() {
      return health;
    },
    set health(val: number) {
      health = val;
    },
  };
}

export class GlobalEnemyStats {
  bonusHealth = $state(0);
  bonusSpeed = $state(0);
  bonusArmor = $state(0);
  bonusResistance = $state<Resistance>({
    fire: 0,
    lightning: 0,
    cold: 0,
    poison: 0,
    debuff: 0,
    stun: 0,
    physical: 0,
  });
  bonusSpawn = $state(0);
  bonusDamage = $state(0);
}
