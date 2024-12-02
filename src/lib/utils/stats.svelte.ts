export function applyBonusStats(baseStats: BaseStats, bonusStats: BonusStats) {
  for (const statsKey in baseStats) {
    const key = statsKey as keyof BonusStats;

    if (key === "resistance") {
      for (const resistanceType in baseStats.resistance) {
        const resType = resistanceType as keyof Resistance;
        if (bonusStats.resistance?.[resType]) {
          baseStats.resistance[resType] =
            (baseStats.resistance[resType] || 0) +
            (bonusStats.resistance[resType] || 0);
        }
      }
    } else if (key.endsWith("Multiplier")) {
      // Multiply multipliers
      const baseKey = key.replace("Multiplier", "") as BaseStatsRawKey;

      if (!baseStats[baseKey]) baseStats[baseKey] = 0;
      baseStats[baseKey] *= bonusStats[key] || 1;
    } else {
      // Sum numeric values
      baseStats[key as BaseStatsRawKey] += bonusStats[key] || 0;
    }
  }

  return baseStats;
}

export function mergeBonusStats(arr: BonusStats[]): BonusStats {
  return arr.reduce<BonusStats>((stats, item) => {
    for (const buffKey in item) {
      const key = buffKey as keyof typeof item;
      if (key === "resistance" && item.resistance) {
        // Merge resistance objects recursively
        stats.resistance = stats.resistance || {};
        for (const resistanceType in item.resistance) {
          const resType = resistanceType as keyof typeof item.resistance;
          stats.resistance[resType] =
            (stats.resistance[resType] || 0) + (item.resistance[resType] || 0);
        }
      } else if (key === "healthMultiplier" || key === "damageMultiplier") {
        // Multiply multipliers
        stats[key] = (stats[key] || 1) * (item[key] || 1);
      } else if (key !== "resistance") {
        // Sum numeric values
        stats[key] = (stats[key] || 0) + (item[key] || 0);
      }
    }

    return stats;
  }, {});
}
