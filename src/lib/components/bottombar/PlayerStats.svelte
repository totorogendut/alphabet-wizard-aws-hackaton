<script lang="ts">
  import { game } from "$lib/game.svelte";
</script>

<div class="flex flex-col gap-2 leading-none">
  <strong class="text-white text-xl">Level {game.player.level}</strong>
  <strong class="text-white text-9xl leading-[0.8]">
    {game.player.stats.health}
  </strong>
</div>
