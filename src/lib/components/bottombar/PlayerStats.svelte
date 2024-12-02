<script lang="ts">
  import { game } from "$lib/game.svelte";

  $inspect(game.player.stats);
</script>

<div class="flex flex-col gap-2 leading-none">
  <strong class="text-white text-xl">Level {game.player.level.current}</strong>
  <strong class="text-white text-9xl leading-[0.8]">
    {Math.floor(game.player.health.current)}
  </strong>
</div>
