import { game } from "$lib/game.svelte";

export function setupProcs() {
  const kill = $derived<Proc[]>(
    game.player.items
      .filter((item) => Boolean(item.procs.onKill))
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      .map((item) => item.procs.onKill!)
  );
  const spellHit = $derived(
    game.player.items
      .filter((item) => Boolean(item.procs.onSpellHit))
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      .map((item) => item.procs.onSpellHit!)
  );
  const gettingHit = $derived(
    game.player.items
      .filter((item) => Boolean(item.procs.onGettingHit))
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      .map((item) => item.procs.onGettingHit!)
  );
  const gameTick = $derived(
    game.player.items
      .filter((item) => Boolean(item.procs.onGameTick))
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      .map((item) => item.procs.onGameTick!)
  );

  return {
    onKill: () => triggerProc(kill),
    onSpellHit: () => triggerProc(spellHit),
    onGettingHit: () => triggerProc(gettingHit),
    onGameTick: () => triggerProc(gameTick),
  };
}

function triggerProc(proc: Proc[]) {
  for (const { chance, fn } of proc) {
    if (Math.random() > chance / 100) continue;
    fn();
  }
}
