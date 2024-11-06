interface ArenaState {
  columns: number;
  enemy: {
    mods: {
      speed: number;
      health: number;
    };
  };
}

type Difficulty = "easy" | "medium" | "hard";

type NewGateState = {
  [string]: ArenaState;
};
