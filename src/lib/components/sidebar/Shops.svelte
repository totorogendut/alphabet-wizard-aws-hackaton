<script lang="ts">
  import { game } from "$lib/game.svelte";
  import { getResourceIcon } from "$lib/resources/helper";
  import { ResourcesData } from "$lib/resources/main.svelte";
  import { shops } from "$lib/shops/main.svelte";
</script>

<div class="p-4 flex gap-1 items-start">
  {#each shops as { icon, title, buy, isCostSufficient, cost }}
    <button
      class="size-16 bg-black/20 text-white flex items-center
        flex-col p-2"
      onclick={buy}
      class:isCostSufficient
    >
      <img src={icon} alt={title} class="size-10 grayscale-25 saturate-50" />
      <div class="flex flex-col gap-2">
        {#each cost as { name, amount }}
          {@const resourceIcon = getResourceIcon(name)}
          <div class="flex items-center gap-1">
            <img src={resourceIcon} class="size-4" alt="" />
            <small>{amount}</small>
          </div>
        {/each}
      </div>
    </button>
  {/each}
</div>

<style lang="postcss">
  .isCostSufficient {
    cursor: pointer;
    img {
      filter: none !important;
    }

    &:hover {
      background-color: #fff3 !important;
    }
  }
</style>
