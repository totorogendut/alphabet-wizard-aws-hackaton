<script lang="ts">
  import type { Snippet } from "svelte";
  import Shops from "./Shops.svelte";
  import Items from "./Items.svelte";
  import BuffsAndDebuffs from "./BuffsAndDebuffs.svelte";
  import Logs from "./Logs.svelte";
</script>

<aside class="bg-teal-800 flex flex-col h-[100vh]">
  <Shops />
  <Items />
  <div class="flex flex-col bg-black grow">
    <Logs />
    <BuffsAndDebuffs />
  </div>
</aside>

<style lang="postcss">
  aside {
    grid-area: sidebar;
  }
</style>
