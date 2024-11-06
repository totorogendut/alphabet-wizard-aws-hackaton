<script lang="ts">
  import { game } from "$lib/game.svelte";
  import KeyboardText from "./KeyboardText.svelte";
</script>

<footer class="bg-red-900 relative">
  <strong class="text-white text-9xl">
    {game.player.health}
  </strong>
  <KeyboardText />
</footer>

<style lang="postcss">
  footer {
    grid-area: bottombar;
  }
</style>
