<script lang="ts">
  import { game } from "$lib/game.svelte";
  import { items } from "$lib/items/items";
  import ItemIcon from "../items/ItemIcon.svelte";
</script>

<section class="basis-[30%] p-4 bg-amber-200 text-black/90 shrink-0">
  <strong class="font-bold text-2xl block mb-2">Items</strong>
  <div class="flex gap-2 flex-wrap">
    {#each game.player.items as item}
      <ItemIcon {...item} />
    {/each}
  </div>
</section>
