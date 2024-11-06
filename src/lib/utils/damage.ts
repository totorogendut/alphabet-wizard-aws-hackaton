const FIXED_MAX_RESISTANCE = 90;

export function damage(dmg: number, type: DamageType = "physical") {
  let damageTaken = dmg;

  return {
    taken: damageTaken,
    armor(armor: number) {
      const damageReduction = armor / (armor + dmg);
      damageTaken = dmg * (1 - damageReduction);
      return this;
    },
    resistance(resistance: number, maxResistance = 75) {
      const cappedResistance = Math.min(
        resistance,
        maxResistance,
        FIXED_MAX_RESISTANCE
      );
      const damageReduction = cappedResistance / 100;
      damageTaken = dmg * (1 - damageReduction);
      return this;
    },
    flatReduction(reduce: number) {
      damageTaken = Math.max(0, damageTaken - reduce);
      return this;
    },
  };
}
