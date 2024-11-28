<script lang="ts">
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
  <div class="flex gap-1 items-start">
    {#each shops as item}
      <ItemIcon {...item}></ItemIcon>
    {/each}
  </div>
</section>
