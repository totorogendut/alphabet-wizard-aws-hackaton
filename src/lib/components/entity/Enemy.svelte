<script lang="ts">
  import type { EnemyEntity } from "$lib/enemy/_store.svelte";

  interface Props {
    data: EnemyEntity;
  }

  const { data }: Props = $props();

  // $inspect(armor);
</script>

<div
  class="bg-amber-300 absolute"
  style="width:{data.size}cqmin;height:{data.size}cqmin;
    left:{data.x}cqw;top:{data.y}cqh;"
></div>
