import { newPlayerStats } from "$lib/utils/difficulty";
import { Health } from "$lib/utils/health.svelte";
import { PlayerLeveling } from "$lib/utils/leveling.svelte";
import { applyBonusStats, mergeBonusStats } from "$lib/utils/stats.svelte";
import { untrack } from "svelte";
import { setupProcs } from "./procs.svelte";
import { Buffs } from "$lib/ststs/buffs..svelte";

export class Player {
  items = $state<Item[]>([]);
  // procs = $state(setupProcs());
  level = new PlayerLeveling();
  buff = new Buffs();
  health: Health;
  bonusStats = $derived<BonusStats>(
    mergeBonusStats(
      this.items.map((item) => item.bonusStats),
      this.buff.all
    )
  );
  stats = $derived<BaseStats>(applyBonusStats(newPlayerStats, this.bonusStats));
  #effectCleanup = $effect.root(() => {
    $effect(() => {
      this.stats.health;
      untrack(() => {
        this.health.max = this.stats.health;
      });
    });

    $effect(() => {
      this.health.regeneration = this.stats.regeneration;
    });
  });

  constructor() {
    this.health = new Health(this.stats);
  }

  free() {
    this.health.free();
    this.level.free();
    this.buff.free();
    this.#effectCleanup();
  }
}
