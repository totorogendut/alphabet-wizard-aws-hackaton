<script lang="ts">
  import { game } from "$lib/game.svelte";
</script>

<div id="logs">
  {#each game.logs as { text, type }}
    <div class="logs-item {type} font-bold text-white">
      {text}
    </div>
  {/each}
</div>

<style lang="postcss">
  #logs :global {
    .success {
    }
  }
</style>
