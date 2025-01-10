<script lang="ts">
  import type { EnemyEntity } from "$lib/enemies/_store.svelte";

  interface Props {
    data: EnemyEntity;
  }

  const { data }: Props = $props();
  const size = $derived(4 + data.size * 0.6);
</script>

<div
  class="group/enemy absolute flex flex-col items-center has-[img:hover]:!z-50"
  style="
    left:{data.pos.x}cqw;top:{data.pos
    .y}cqh; z-index:{data.size};width:{size}cqmin;"
  data-size={data.size}
>
  <enhanced:img
    class="block relative border-[1px]"
    style="width:{size}cqmin;height:{size}cqmin;"
    src={data.sprite}
  >
  </enhanced:img>
  <div style="width:{size}cqmin;" class="flex items-center justify-center">
    <progress value={data.health.current} max={data.health.max} class="w-full">
    </progress>
    <span class="text-white absolute text-sm"
      >{Math.floor(data.health.current)}</span
    >
  </div>
  <strong
    class="w-max text-center group-has-[img:hover]/enemy:bg-white px-2 leading-1
      group-has-[img:hover]/enemy:outline-1 outline-black">{data.text}</strong
  >
</div>
