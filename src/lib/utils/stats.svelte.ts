export function applyBonusStats(baseStats: BaseStats, bonusStats: BonusStats) {
  const stats = structuredClone(baseStats);
  for (const statsKey in bonusStats) {
    const key = statsKey as keyof BonusStats;

    if (key === "resistance") {
      for (const resistanceType in stats.resistance) {
        const resType = resistanceType as keyof Resistance;
        if (bonusStats.resistance?.[resType]) {
          stats.resistance[resType] =
            (stats.resistance[resType] || 0) +
            (bonusStats.resistance[resType] || 0);
        }
      }
    } else if (key.endsWith("Multiplier")) {
      // Multiply multipliers
      const baseKey = key.replace("Multiplier", "") as BaseStatsRawKey;

      if (!stats[baseKey]) stats[baseKey] = 0;
      stats[baseKey] *= bonusStats[key] || 1;
    } else {
      // Sum numeric values
      stats[key as BaseStatsRawKey] += bonusStats[key] || 0;
    }
  }

  return stats;
}

export function mergeBonusStats(
  ...arr: Array<BonusStats[] | BonusStats>
): BonusStats {
  const stats: BonusStats = {};
  for (const bonuses of arr) {
    if (Array.isArray(bonuses)) {
      for (const bonus of bonuses) {
        addStats(bonus);
      }
    } else {
      addStats(bonuses);
    }
  }

  return stats;

  function addStats(bonus: BonusStats) {
    for (const buffKey in bonus) {
      const key = buffKey as keyof typeof bonus;
      if (key === "resistance" && bonus.resistance) {
        // Merge resistance objects recursively
        stats.resistance = stats.resistance || {};
        for (const resistanceType in bonus.resistance) {
          const resType = resistanceType as keyof typeof bonus.resistance;
          stats.resistance[resType] =
            (stats.resistance[resType] || 0) + (bonus.resistance[resType] || 0);
        }
      } else if (key === "healthMultiplier" || key === "damageMultiplier") {
        // Multiply multipliers
        stats[key] = (stats[key] || 1) * (bonus[key] || 1);
      } else if (key !== "resistance") {
        // Sum numeric values
        stats[key] = (stats[key] || 0) + (bonus[key] || 0);
      }
    }
  }
}
