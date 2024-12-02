import { untrack } from "svelte";
import type { GameState } from "$lib/game.svelte";

export class Health {
  #max = $state(0);
  #current = $state(0);
  #percentage = $derived(this.#current / this.#max);
  readonly isLowHealth = $derived(this.#percentage <= 0.5);
  readonly isHighHealth = $derived(this.#percentage >= 0.85);
  readonly isFullHealth = $derived(this.#percentage >= 1);
  readonly isAlive = $derived(this.#current > 0);

  constructor(gameState: GameState, stats: BaseStats) {
    this.#max = stats.health;
    this.#current = stats.health;

    $effect.root(() => {
      $effect(() => {
        if (!gameState.turn) return;
        untrack(() => {
          if (!this.isAlive) return;
          this.current += stats.regeneration;
        });
      });
    });
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
    const currentHealth = this.#max / this.#current;
    this.#max = val;
    this.#current = this.#max * currentHealth;
  }
}
