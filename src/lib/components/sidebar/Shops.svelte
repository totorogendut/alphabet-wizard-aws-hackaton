<script lang="ts">
  import { game } from "$lib/game.svelte";
  import { shops } from "$lib/shops/main.svelte";
  import ItemIcon from "../items/ItemIcon.svelte";
</script>

<section class="basis-[30%] shrink-0 p-4">
  <strong
    class="text-4xl font-extrabold mt-4 mb-2 block
    text-white/90 text-center"
  >
    ~Shop~
  </strong>
  <div class="flex gap-1 items-start flex-wrap">
    {#each shops as item}
      <ItemIcon {...item}></ItemIcon>
    {/each}
  </div>
</section>
