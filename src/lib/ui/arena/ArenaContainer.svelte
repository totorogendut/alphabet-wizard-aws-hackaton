<script lang="ts">
  import Enemy from "$lib/components/entity/Enemy.svelte";
  import { game, gameTick } from "$lib/game.svelte";
  import { untrack, type Snippet } from "svelte";

  $effect(() => {
    game.keyboard.text;
    untrack(gameTick);
  });
</script>

<div id="arena" class=" bg-green-300">
  {#each game.enemies as data}
    <Enemy {data} />
  {/each}
</div>

<style lang="postcss">
  #arena {
    position: relative;
    container: arena / size;
    grid-area: arena;
    /* width: min(1600px,100vw);
		height: 80vh; */
    overflow: hidden;
  }
</style>
