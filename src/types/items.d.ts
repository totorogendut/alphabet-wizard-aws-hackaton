interface Item {
  cost: Resource[];
  isCostSufficient?: boolean;
  buffs: Buff[];
  procs: {
    onKill?: Proc;
    onSpellHit?: Proc;
    onGettingHit?: Proc;
    onGameTick?: Proc;
  };
  icon: string;
}
