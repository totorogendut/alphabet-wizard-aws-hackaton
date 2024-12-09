import { game } from "$lib/game.svelte";
import { nanoid } from "nanoid";
import { untrack } from "svelte";

export class Buffs {
  all = $state<Buff[]>([]);
  buffs = $derived<Buff[]>(this.all.filter((buff) => !buff.isNegative));
  debuffs = $derived<Buff[]>(this.all.filter((buff) => buff.isNegative));
  #effectCleanup = $effect.root(() => {
    $effect(() => {
      if (!game.turn) return;
      untrack(() => {
        for (const buff of this.all) {
          buff.duration--;
          if (buff.duration <= 0) this.remove(buff.id);
        }
      });
    });
  });

  free() {
    this.#effectCleanup();
  }

  remove(id: string | string[]) {
    if (Array.isArray(id)) {
      for (const singleId of id) this.remove(singleId);
      return;
    }

    const index = this.all.findIndex((buff) => buff.id === id);
    this.all.splice(index, 1);
  }

  addBuff(
    stats: BaseStats,
    opts: Omit<Buff, keyof BonusStats | "id" | "isNegative">
  ) {
    this.addGeneric(stats, false, opts);
  }

  addDebuff(
    stats: BonusStats,
    opts: Omit<Buff, keyof BonusStats | "id" | "isNegative">
  ) {
    this.addGeneric(stats, true, opts);
  }

  addGeneric(
    stats: BonusStats,
    isNegative: boolean,
    opts: Omit<Buff, keyof BonusStats | "id" | "isNegative">
  ) {
    this.all.push({
      ...(isNegative ? calculateDebuff(stats) : stats),
      isDispellable: opts?.isDispellable ?? true,
      duration: opts?.duration ?? 5,
      id: nanoid(),
      isNegative,
    });
  }

  dispellAll() {
    for (const { id, isDispellable } of this.all) {
      if (isDispellable) this.remove(id);
    }
  }

  dispellBuff() {
    for (const { id, isDispellable } of this.buffs) {
      if (isDispellable) this.remove(id);
    }
  }

  dispellDebuff() {
    for (const { id, isDispellable } of this.debuffs) {
      if (isDispellable) this.remove(id);
    }
  }
}

export function calculateDebuff(debuff: BonusStats): BonusStats {
  return debuff;
}
