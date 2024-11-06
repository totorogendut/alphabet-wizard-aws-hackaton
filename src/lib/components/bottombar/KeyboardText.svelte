<script lang="ts">
  import { game } from "$lib/game.svelte";
</script>

{#if game?.keyboard}
  <input
    class="p-4 border-2 border-blue-600 bg-blue-300 text-blue-950
      absolute right-2 top-2"
    type="text"
    bind:value={game.keyboard.text}
  />
{/if}

<style lang="postcss">
</style>
