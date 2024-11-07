<script lang="ts">
  import type { EnemyEntity } from "$lib/enemies/_store.svelte";

  interface Props {
    data: EnemyEntity;
  }

  const { data }: Props = $props();

  // $inspect(armor);
</script>

<div
  class="bg-amber-300 absolute"
  style="width:{data.size}cqmin;height:{data.size}cqmin;
    left:{data.pos.x}cqw;top:{data.pos.y}cqh; z-index;{data.size}"
>
  <progress
    value={data.health.current}
    max={data.health.max}
    class="absolute -bottom-4 left-0 w-full"
  >
  </progress>
</div>
