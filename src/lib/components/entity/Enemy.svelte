<script lang="ts">
  import type { EnemyEntity } from "$lib/enemies/_store.svelte";

  interface Props {
    data: EnemyEntity;
  }

  const { data }: Props = $props();
  const size = $derived(4 + data.size * 0.6);
</script>

<div
  class="bg-amber-300 absolute"
  style="
    left:{data.pos.x}cqw;top:{data.pos.y}cqh; z-index:{data.size};"
  data-size={data.size}
>
  <enhanced:img style="width:{size}cqmin;height:{size}cqmin;" src={data.sprite}>
  </enhanced:img>
  <progress
    value={data.health.current}
    max={data.health.max}
    class="absolute -bottom-4 left-0 w-full"
  >
  </progress>
</div>
