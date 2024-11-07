<script lang="ts">
  import { game } from "$lib/game.svelte";

  function onSubmit(e: Event) {
    e.preventDefault();
    game.keyboard.text = "";
    game.player.exp += 60;
  }
</script>

{#if game?.keyboard}
  <form onsubmit={onSubmit}>
    <input
      class="p-2 border-2 border-blue-600 bg-blue-300 text-blue-950
      w-[400px]"
      type="text"
      bind:value={game.keyboard.text}
    />
    <button class="hidden" type="submit">SUBMIT</button>
  </form>
{/if}

<style lang="postcss">
</style>
