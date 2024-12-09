import { game } from "$lib/game.svelte";
import { Buffs } from "$lib/ststs/buffs..svelte";
import { Health } from "$lib/utils/health.svelte";
import { mergeArray } from "$lib/utils/misc";
import { setupPosition, type Position } from "$lib/utils/position.svelte";
import { applyBonusStats, mergeBonusStats } from "$lib/utils/stats.svelte";
import { nanoid } from "nanoid";
import { untrack } from "svelte";

export class EnemyEntity {
  id: string;
  health: Health;
  buff = new Buffs();
  pos: Position = $state({ x: 0, y: 0 });
  baseStats = $state() as EnemyStats;
  bonusStats = $derived<BonusStats>(
    mergeBonusStats(game.globalEnemyStats, this.buff.all)
  );
  stats = $derived<BaseStats>(
    applyBonusStats($state.snapshot(this.baseStats), this.bonusStats)
  );
  isArrived = $derived(this.pos.y >= 100);
  sprite = $derived(this.baseStats.sprite);
  size = $derived(this.baseStats.size);
  #effectCleanup = $effect.root(() => {
    $effect(() => {
      if (!game.turn) return;
      untrack(() => {
        if (this.isArrived) this.attack();
      });
    });
  });

  constructor(stats: EnemyStats) {
    this.id = nanoid();
    this.baseStats = stats;
    this.health = new Health(stats);
    this.pos = setupPosition({
      x: Math.max(Math.random() * 90, 10),
      y: 0,
    });
  }

  attack() {
    game.player.health.current -= this.stats.damage;
    this.remove();
  }

  remove() {
    const index = game.enemies.findIndex((enemy) => enemy.id === this.id);
    game.enemies.splice(index, 1);
    this.health.free();
    this.buff.free();
    this.#effectCleanup();
  }
}

export class GlobalEnemyStats {
  bonusHealth = $state(0);
  bonusSpeed = $state(0);
  bonusArmor = $state(0);
  bonusResistance = $state<Resistance>({
    fire: 0,
    lightning: 0,
    cold: 0,
    poison: 0,
    debuff: 0,
    stun: 0,
    physical: 0,
  });
  bonusSpawn = $state(0);
  bonusDamage = $state(0);
}
