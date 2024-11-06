<script lang="ts">
  interface Props {
    src: string;
    height: number;
    width: number;
    frame: number;
  }
  const { src, height, width, frame = 1 }: Props = $props();
  const totalFrames = $derived(Math.ceil(width / height));
</script>

<img
  style="--frame-position:{width / (frame - 1)};"
  {src}
  {height}
  width={height}
  alt=""
/>

<style lang="postcss">
  img {
    background-position: 0 var(--frame-position);
  }
</style>
