<script lang="ts">
  import type { Snippet } from "svelte";
  import Shops from "./Shops.svelte";
  import Items from "./Items.svelte";
  import BuffsAndDebuffs from "./BuffsAndDebuffs.svelte";
</script>

<aside class="bg-teal-800">
  <Shops />
  <Items />
  <BuffsAndDebuffs />
</aside>

<style lang="postcss">
  aside {
    grid-area: sidebar;
  }
</style>
