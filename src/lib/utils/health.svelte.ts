import { untrack } from "svelte";
import { game, type GameState } from "$lib/game.svelte";

export class Health {
  #max = $state(0);
  #current = $state(0);
  #percentage = $derived(this.#current / this.#max);
  regeneration = $state(0);
  readonly isLowHealth = $derived(this.#percentage <= 0.5);
  readonly isHighHealth = $derived(this.#percentage >= 0.85);
  readonly isFullHealth = $derived(this.#percentage >= 1);
  readonly isAlive = $derived(this.#current > 0);
  #effectCleanup = $effect.root(() => {
    $effect(() => {
      if (!game.turn) return;
      untrack(() => {
        if (!this.isAlive) return;
        this.current += this.regeneration;
      });
    });
  });

  constructor(stats: BaseStats) {
    this.#max = stats.health;
    this.#current = stats.health;
    this.regeneration = stats.regeneration;
  }

  get max() {
    return this.#max;
  }
  get current() {
    return this.#current;
  }
  get percentage() {
    return this.#percentage;
  }
  set current(val: number) {
    this.#current = Math.max(Math.min(val, this.#max), 0);
  }
  set max(val: number) {
    const currentHealth = this.#current / this.#max;
    this.#max = val;
    this.#current = this.#max * currentHealth;
  }

  free() {
    this.#effectCleanup();
  }
}
