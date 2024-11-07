import { setupHealth } from "$lib/utils/health.svelte";
import { setupPosition } from "$lib/utils/position.svelte";
import { nanoid } from "nanoid";

export type EnemyEntity = ReturnType<typeof createEnemyEntity>;

export function createEnemyEntity(data: EnemyStats) {
  const id = nanoid();
  const pos = setupPosition({
    x: Math.max(Math.random() * 90, 10),
    y: 0,
  });
  const buffs = $state<Buff[]>([]);
  const debuffs = $state<Debuff[]>([]);
  const health = setupHealth(data.health);
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
  const hasArrived = $derived(pos.y >= 100);

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
    get health() {
      return health;
    },
    get id() {
      return id;
    },
    get pos() {
      return pos;
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
