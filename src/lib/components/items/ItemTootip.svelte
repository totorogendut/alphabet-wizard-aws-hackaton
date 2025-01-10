<script lang="ts">
  import { itemTooltip } from "$lib/items/tooltips.svelte";
  import BonusStatsList from "../stats/BonusStatsList.svelte";
</script>

{#if itemTooltip.item}
  <div
    class="w-52 p-4 bg-black/40 rounded-md fixed z-50 backdrop-blur-md"
    style="top: anchor({itemTooltip.anchor} top); right: calc(anchor(--sidebar left) + 1em)"
  >
    <div class="flex gap-4">
      <img
        width={32}
        height={32}
        src={itemTooltip.item.icon}
        alt={itemTooltip.item.title}
      />
      <strong class="text-yellow-200 leading-tight">
        {itemTooltip.item.title}
      </strong>
    </div>
    <div class="mt-4 mb-2 text-white/70">
      {itemTooltip.item.description}
    </div>
    <BonusStatsList stats={itemTooltip.item.bonusStats} />
  </div>
{/if}
