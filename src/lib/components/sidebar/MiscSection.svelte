<script lang="ts">
  import { game } from "$lib/game.svelte";
  import BonusStatsList from "../stats/BonusStatsList.svelte";
  import Logs from "./Logs.svelte";

  let selected: "logs" | "stats" = $state("logs");
</script>

<div class="flex p-4 gap-2">
  <button
    class={[
      "rounded-md py-1 px-4",
      selected === "logs"
        ? "bg-amber-700 text-white"
        : "bg-amber-100 hover:brightness-90 cursor-pointer",
    ]}
    onclick={() => (selected = "logs")}>Logs</button
  >
  <button
    class={[
      "rounded-md py-1 px-4",
      selected === "stats"
        ? "bg-amber-700 text-white"
        : "bg-amber-100 hover:brightness-90 cursor-pointer",
    ]}
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
