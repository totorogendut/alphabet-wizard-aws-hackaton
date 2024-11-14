<script lang="ts">
  import { game } from "$lib/game.svelte";

  const resources: Resource[] = $derived([
    game.resources.gold,
    game.resources.lumber,
    game.resources.stone,
    game.resources.amber,
    game.resources.quartz,
    game.resources.food,
  ]);
</script>

<div class="flex gap-2 self-end">
  {#each resources as { name, amount, icon }}
    <div class="flex flex-col items-center w-12 font-extrabold text-white">
      <img width="20" height="20" src={icon} alt={name} />
      <span>{amount}</span>
    </div>
  {/each}
</div>
