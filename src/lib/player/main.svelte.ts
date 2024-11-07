import type { createItems } from "$lib/items/main.svelte";
import { newPlayerStats } from "$lib/utils/difficulty";
import { setupHealth } from "$lib/utils/health.svelte";
import { ExperienceBase } from "$lib/utils/leveling.svelte";
import { setupProcs } from "./procs.svelte";

export class Player extends ExperienceBase {
  stats = $state<PlayerStats>(newPlayerStats);
  health = setupHealth(this.stats.health);
  items = $state<ReturnType<typeof createItems>[]>([]);
  procs = $state(setupProcs());
}
