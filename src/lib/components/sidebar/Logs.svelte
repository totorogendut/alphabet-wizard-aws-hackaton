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
  #logs {
    .success {
      color: var(--color-green-200);
    }
    .battle {
      color: var(--color-orange-200);
    }
    .info {
      color: var(--color-yellow-200);
    }
    .error {
      color: var(--color-red-200);
    }
  }
</style>
