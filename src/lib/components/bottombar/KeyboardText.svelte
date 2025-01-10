<script lang="ts">
  import { game } from "$lib/game.svelte";

  // biome-ignore lint/style/useConst: <explanation>
  let inputEl = $state<HTMLInputElement>();
  const isLastTextSpace = $derived(
    game.keyboard.text.slice(-1) === " " && !game.keyboard.isCommandInvalid
  );
  const isTypingAllowed = $derived(!game.isDefeated && !game.isPaused);
  const invalid = $derived(
    game.keyboard.isCommandInvalid && !!game.keyboard.text
  );

  function onSubmit(e: Event) {
    e.preventDefault();
    game.keyboard.submit();
  }

  function onKeyUp(e: KeyboardEvent) {
    const { key } = e;
    if (!isTypingAllowed || !(document.activeElement === inputEl)) return;
    if (key === "Delete" || key === "Backspace") game.keyboard.cancel();
  }
</script>

<svelte:window onkeyup={onKeyUp} />

<div class="row-span-2 flex flex-col w-[400px] justify-self-end">
  {#if game?.keyboard}
    <form onsubmit={onSubmit} class="group/input self-end w-full" class:invalid>
      <input
        class="p-2 border-2 border-blue-600 bg-blue-300 text-blue-950 w-full
         group-[.invalid]/input:border-red-700 group-[.invalid]/input:bg-red-300"
        type="text"
        bind:value={game.keyboard.text}
        bind:this={inputEl}
        placeholder="Command"
      />
      <button class="hidden" type="submit">SUBMIT</button>
      <div class="flex gap-2 text-white/90 mt-2">
        {#each game.keyboard.commandHelper as text}
          <span class="bg-gray-400/40 py-0.5 px-2 rounded-sm">{text}</span>
        {/each}
      </div>
      {#if game.keyboard.showInputWarning}
        <div class="text-white/70 grow-0 leading-tight">
          <strong>Command error penalty:</strong>
          <ol class="list-disc">
            <li>
              If you choose to press <kbd>Backspace</kbd> or <kbd>Delete</kbd>,
              you will lose 3 turns on top of wasted turns by typing the wrong
              commands.
            </li>
            <li>
              But if you submit the wrong command or miss an attack, you will
              inflict damage to yourself based on your stats.
            </li>
          </ol>
        </div>
      {/if}
    </form>
  {/if}
</div>

<style lang="postcss">
</style>
