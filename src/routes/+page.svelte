<script lang="ts">
  import { game } from "$lib/game.svelte";
  import ArenaContainer from "$lib/ui/arena/ArenaContainer.svelte";
  import SideBarContainer from "$lib/components/sidebar/SideBarContainer.svelte";
  import BottomBarContainer from "$lib/components/bottombar/BottomBarContainer.svelte";
  import Endgame from "$lib/components/arena/Endgame.svelte";
</script>

{#if !game.isDefeated}
  <main class="play">
    <ArenaContainer />
    <SideBarContainer />
    <BottomBarContainer />
  </main>
{:else}
  <main class="bg-amber-500">
    <Endgame />
  </main>
{/if}

<style lang="postcss">
  main {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-template-rows: 80vh 1fr;
    grid-template-areas: "arena sidebar" "bottombar sidebar";
  }
</style>
