import type { createItems } from "$lib/items/main.svelte";
import { newPlayerStats } from "$lib/utils/difficulty";
import { Health } from "$lib/utils/health.svelte";
import { LevelingBase, PlayerLeveling } from "$lib/utils/leveling.svelte";
import { setupProcs } from "./procs.svelte";

export class Player {
  stats = $state<PlayerStats>(newPlayerStats);
  health = new Health(this.stats);
  items = $state<ReturnType<typeof createItems>[]>([]);
  procs = $state(setupProcs());
  level = new PlayerLeveling();
}
