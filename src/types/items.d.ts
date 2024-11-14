interface Item {
  title: string;
  cost: Resource[];
  isCostSufficient?: boolean;
  buffs: BuffBase[]; // between 1 ~ 3 random buffs
  procs?: {
    // between 0 ~ 2 random procs
    onKill?: Proc;
    onSpellHit?: Proc;
    onGettingHit?: Proc;
    onGameTick?: Proc;
  };
  icon: string;
  description: string; // description is based
}
