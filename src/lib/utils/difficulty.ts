export type Difficulty = "easy" | "medium" | "hard";

export const newPlayerStats: PlayerStats = {
  health: 300,
  regeneration: 5,
  speed: 1,
  damage: 20,
  armor: 0,
  resistance: {
    debuff: 0,
    stun: 0,
    fire: 0,
    cold: 0,
    lightning: 0,
    poison: 0,
    physical: 0,
  },
  buffs: [],
  debuffs: [],
};

export const newGateState: {
  easy: ArenaState;
  medium: ArenaState;
  hard: ArenaState;
} = {
  easy: {
    columns: 3,
    enemy: {
      mods: {
        speed: 1,
        health: 1,
      },
    },
  },
  medium: {
    columns: 3,
    enemy: {
      mods: {
        speed: 1,
        health: 1,
      },
    },
  },
  hard: {
    columns: 3,
    enemy: {
      mods: {
        speed: 1,
        health: 1,
      },
    },
  },
} as const;
