<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    stats: BonusStats;
  }

  const { stats }: Props = $props();
</script>

<ul class="text-blue-200">
  {#each Object.entries(stats) as [key, data]}
    {#if key === "resistance"}
      {#each Object.entries(stats.resistance!) as [resKey, value]}
        <li>+{value}% {resKey} resistance</li>
      {/each}
    {:else if key.endsWith("Multiplier")}
      {@const baseKey = key.replace("Multiplier", "") as keyof BonusStats}
      {@const mult = stats[key as BaseStatsRawKey]! * 100 - 100}
      <li>
        Increases {baseKey} by {Math.floor(mult)}%
      </li>
    {:else}
      <li>+{data} {key}</li>
    {/if}
  {/each}
</ul>
