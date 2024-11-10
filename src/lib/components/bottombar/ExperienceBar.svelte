<script lang="ts">
  import { game } from "$lib/game.svelte";
</script>

<progress
  class="w-full absolute top-0 left-0"
  max={game.player.level.expForNextLevel}
  value={game.player.level.exp}
></progress>
