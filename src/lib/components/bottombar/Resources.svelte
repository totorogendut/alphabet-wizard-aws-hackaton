<script lang="ts">
  import { game } from "$lib/game.svelte";

  const resources: Resource[] = $derived([
    game.resources.gold,
    game.resources.lumber,
    game.resources.stone,
    game.resources.gem,
    game.resources.mineral,
    game.resources.food,
  ]);
</script>

<div class="flex gap-4 self-end">
  {#each resources as { name, amount, icon }}
    <div class="flex flex-col leading-tight items-center w-12 text-white">
      <img width="20" height="20" src={icon} alt={name} />
      <strong class="text-center">{name}</strong>
      <span class="">{amount}</span>
    </div>
  {/each}
</div>
