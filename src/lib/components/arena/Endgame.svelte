<script lang="ts">
  import { game, GameState, restartGame } from "$lib/game.svelte";
</script>

<section
  class="text-black/80 absolute top-44 left-24 p-6 px-8 bg-white/40 rounded-md w-[70%] max-w-[700px]"
>
  <h2 class="text-4xl font-extrabold mb-2">Game Over</h2>
  <div class="font-semibold text-xl text-black/60">
    Your score is {game.player.level.exp}
  </div>
  <div class="mt-4">
    <button
      onclick={restartGame}
      class="px-6 font-extrabold py-2 rounded-md bg-green-600 text-white/90 active:bg-green-700
        cursor-pointer">New Game</button
    >
  </div>
</section>

<style>
</style>
