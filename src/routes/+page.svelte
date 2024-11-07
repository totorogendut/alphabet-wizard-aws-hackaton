<script lang="ts">
  import Enemy from "$lib/components/entity/Enemy.svelte";
  import KeyboardText from "$lib/components/bottombar/KeyboardText.svelte";
  import { game } from "$lib/game.svelte";
  import ArenaContainer from "$lib/ui/arena/ArenaContainer.svelte";
  import SideBarContainer from "$lib/components/sidebar/SideBarContainer.svelte";
  import BottomBarContainer from "$lib/components/bottombar/BottomBarContainer.svelte";
</script>

{#if game.player.stats.health}
  <main class="play">
    <ArenaContainer />
    <SideBarContainer />
    <BottomBarContainer />
  </main>
{/if}

<style lang="postcss">
  main.play {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-template-rows: 80vh 1fr;
    grid-template-areas: "arena sidebar" "bottombar sidebar";
  }
</style>
