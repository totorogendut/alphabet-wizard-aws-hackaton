<script lang="ts">
  import { game } from "$lib/game.svelte";
  import ExperienceBar from "./ExperienceBar.svelte";
  import KeyboardText from "./KeyboardText.svelte";
  import PlayerStats from "./PlayerStats.svelte";
</script>

<footer class="bg-red-900 relative pt-4 px-4">
  <ExperienceBar />
  <div class="flex items-start justify-between mt-4">
    <PlayerStats />
    <KeyboardText />
  </div>
</footer>

<style lang="postcss">
  footer {
    grid-area: bottombar;
  }
</style>
