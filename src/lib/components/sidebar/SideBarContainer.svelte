<script lang="ts">
  import type { Snippet } from "svelte";
  import Shops from "./Shops.svelte";
  import Items from "./Items.svelte";
  import BuffsAndDebuffs from "./BuffsAndDebuffs.svelte";
  import Logs from "./Logs.svelte";
  import ItemTootip from "../items/ItemTootip.svelte";
  import MiscSection from "./MiscSection.svelte";
</script>

<aside
  class="bg-teal-800 flex flex-col h-[100vh]"
  style="anchor-name:--sidebar;"
>
  <Shops />
  <Items />
  <div class="flex flex-col bg-black grow">
    <MiscSection />
    <BuffsAndDebuffs />
  </div>
</aside>
<ItemTootip />

<style lang="postcss">
  aside {
    grid-area: sidebar;
  }
</style>
