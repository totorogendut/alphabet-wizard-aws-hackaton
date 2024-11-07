interface Item {
  cost: Resource[];
  buffs: Buff[];
  procs: {
    onKill?: Proc;
    onSpellHit?: Proc;
    onGettingHit?: Proc;
    onGameTick?: Proc;
  };
}
