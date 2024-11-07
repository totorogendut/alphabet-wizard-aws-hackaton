import { game } from "$lib/game.svelte";

export function setupProcs() {
  const kill = $derived(deriveProcsFromItems("onKill"));
  const spellHit = $derived(deriveProcsFromItems("onSpellHit"));
  const gettingHit = $derived(deriveProcsFromItems("onGettingHit"));
  const gameTick = $derived(deriveProcsFromItems("onGameTick"));

  return {
    onKill: () => triggerProc(kill),
    onSpellHit: () => triggerProc(spellHit),
    onGettingHit: () => triggerProc(gettingHit),
    onGameTick: () => triggerProc(gameTick),
  };
}

function deriveProcsFromItems(key: keyof Item["procs"]): Proc[] {
  return (
    game.player.items
      .filter((item) => key in item.procs)
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      .map((item) => item.procs[key]!)
  );
}

function triggerProc(proc: Proc[]) {
  for (const { chance, fn } of proc) {
    if (Math.random() > chance / 100) continue;
    fn();
  }
}
