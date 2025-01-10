<script lang="ts">
  import { game, GameState, restartGame } from "$lib/game.svelte";
  import { getRandomChild } from "$lib/utils/misc";

  const tips = [
    `Move faster than your enemies! Speed 
    attribute is rare but it lower the time for enemies to reach you.`,
    "Killing enemies with longer names give you more exp and resources.",
    `It is a good idea to gather resources at the beginning of the game
    for early items so you can kill and defend enemies easier.`,
    "Beware of snakes! They hurt a lot once they get to bite you!",
    "Birds sure are fast but with they can easily be killed with only one sword",
    `This is a turn-based game, you don't get punished for playing the game slowly!
    Carefully type the command, take it slowly, because a single typo can cost you dearly.`,
  ];
</script>

<section class="text-black/80 absolute top-44 left-24 w-[70%] max-w-[700px]">
  <div class="p-6 px-8 bg-white/40 rounded-md">
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
  </div>
  <div class="mt-6 leading-tight">
    <strong>TIPS:</strong>
    <p>{tips[Math.floor(Math.random() * tips.length)]}</p>
  </div>
  <div class="mt-4">
    <span class="font-semibold">Support:</span>
    <a
      class="font-bold inline-block bg-gray-200 hover:brightness-90
        px-4 py-1 rounded-md ml-2"
      href="https://github.com/sponsors/totorogendut">💖 Sponsor</a
    >
  </div>
</section>

<style>
</style>
