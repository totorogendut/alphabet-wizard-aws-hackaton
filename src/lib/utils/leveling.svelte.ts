import { untrack } from "svelte";

export class LevelingBase {
  #MAX_LEVEL = 100;
  #exp = $state<number>(0);
  current = $state<number>(1);
  expForNextLevel = $state(100);
  points = $state(0);
  #effectCleanup = $effect.root(() => {
    $effect(() => {
      if (this.current > 1)
        untrack(() => {
          this.levelUp();
        });
    });
  });

  constructor(opts?: { maxLevel: number }) {
    if (opts?.maxLevel) this.#MAX_LEVEL = opts.maxLevel;
  }

  free() {
    this.#effectCleanup();
  }

  levelUp() {
    this.points += 5;
  }

  set exp(val: number) {
    this.#exp = val;
    if (this.#exp >= this.expForNextLevel && this.current < this.#MAX_LEVEL) {
      this.current++;
      if (this.current < this.#MAX_LEVEL) {
        this.#exp -= this.expForNextLevel;
        this.expForNextLevel += nextLevelFactor(this.current);
      } else {
        this.#exp = this.expForNextLevel;
      }
    }
  }

  get exp() {
    return this.#exp;
  }
}

export class PlayerLeveling extends LevelingBase {
  constructor() {
    super({
      maxLevel: 100,
    });
  }
}

export class SpellLeveling extends LevelingBase {
  constructor() {
    super({
      maxLevel: 10,
    });
  }
}

function nextLevelFactor(level: number) {
  if (level < 3) return level * 100;
  if (level < 5) return level * 150;
  if (level < 7) return level * 230;
  if (level < 9) return level * 400;
  return level * 1000;
}
