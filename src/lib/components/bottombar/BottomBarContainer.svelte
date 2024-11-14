<script lang="ts">
  import { game } from "$lib/game.svelte";
  import ExperienceBar from "./ExperienceBar.svelte";
  import KeyboardText from "./KeyboardText.svelte";
  import PlayerStats from "./PlayerStats.svelte";
  import Resources from "./Resources.svelte";
</script>

<footer class="bg-red-900 relative pt-4 px-4">
  <ExperienceBar />

  <div class="grid grid-cols-2 grid-rows-[1fr,100px] row mt-4 h-[90cqh]">
    <PlayerStats />
    <KeyboardText />
    <Resources />
  </div>
</footer>

<style lang="postcss">
  footer {
    container: bottombar / size;
    grid-area: bottombar;
  }
</style>
