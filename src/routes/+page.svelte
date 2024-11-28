<script lang="ts">
  import { game } from "$lib/game.svelte";
  import ArenaContainer from "$lib/ui/arena/ArenaContainer.svelte";
  import SideBarContainer from "$lib/components/sidebar/SideBarContainer.svelte";
  import BottomBarContainer from "$lib/components/bottombar/BottomBarContainer.svelte";
</script>

{#if !game.isDefeated}
  <main class="play">
    <ArenaContainer />
    <SideBarContainer />
    <BottomBarContainer />
  </main>
{:else}
  <h1>Dead</h1>
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
