<script lang="ts">
  import { game } from "$lib/game.svelte";
  import BonusStatsList from "../stats/BonusStatsList.svelte";
  import Logs from "./Logs.svelte";

  let selected: "logs" | "stats" = $state("logs");
</script>

<div class="flex p-4 gap-2">
  <button
    class="bg-amber-200 rounded-md py-1 px-4"
    onclick={() => (selected = "logs")}>Logs</button
  >
  <button
    class="bg-amber-200 rounded-md py-1 px-4"
    onclick={() => (selected = "stats")}>Bonus Stats</button
  >
</div>
<section
  class="h-[300px] bg-black p-4 grow overflow-y-scroll
  flex flex-col justify-end"
>
  {#if selected === "logs"}
    <Logs />
  {:else if selected === "stats"}
    <BonusStatsList stats={game.player.bonusStats} />
  {/if}
</section>
