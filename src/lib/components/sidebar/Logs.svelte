<script lang="ts">
  import { game } from "$lib/game.svelte";
</script>

<section
  id="logs"
  class="h-[300px] bg-black p-4 grow overflow-y-scroll
  flex flex-col justify-end"
>
  {#each game.logs as { text, type }}
    <div class="logs-item {type} font-bold text-white">
      {text}
    </div>
  {/each}
</section>

<style lang="postcss">
  #logs :global {
    .success {
    }
  }
</style>
