import { game, type GameState } from "$lib/game.svelte";
import type { createItems } from "$lib/items/main.svelte";
import { newPlayerStats } from "$lib/utils/difficulty";
import { Health } from "$lib/utils/health.svelte";
import { LevelingBase, PlayerLeveling } from "$lib/utils/leveling.svelte";
import { applyBonusStats, mergeBonusStats } from "$lib/utils/stats.svelte";
import { setupProcs } from "./procs.svelte";

export class Player {
  items = $state<ReturnType<typeof createItems>[]>([]);
  procs = $state(setupProcs());
  level = new PlayerLeveling();
  health: Health;
  bonusStats = $derived.by<BonusStats>(() =>
    mergeBonusStats(game.items.map((item) => item.bonusStats))
  );
  stats = $derived<BaseStats>(applyBonusStats(newPlayerStats, this.bonusStats));

  constructor(gameState: GameState) {
    this.health = new Health(gameState, this.stats);
  }
}
