<script lang="ts">
  import { game } from "$lib/game.svelte";

  $effect(() => {
    if (game.player.level > 1) {
      console.log("level up");
    }
  });
</script>

<progress
  class="w-full absolute top-0 left-0"
  max={game.player.expNextLevel}
  value={game.player.exp}
></progress>
