import { game } from "$lib/game.svelte";
import { Buffs } from "$lib/ststs/buffs..svelte";
import { Health } from "$lib/utils/health.svelte";
import { setupPosition, type Position } from "$lib/utils/position.svelte";
import { applyBonusStats, mergeBonusStats } from "$lib/utils/stats.svelte";
import { Faker, faker } from "@faker-js/faker";
import { nanoid } from "nanoid";
import { untrack } from "svelte";

export class EnemyEntity {
  id: string;
  text: string;
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

    $effect(() => {
      if (this.health.isAlive) return;
      untrack(() => {
        this.onDeath();
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

    const type = stats.type as keyof typeof faker;
    const subType = stats.subType as keyof typeof faker.animal;
    this.text = faker.animal?.[subType]?.()?.toLowerCase?.() || "lol";
  }

  attack() {
    game.player.health.current -= this.stats.damage;
    this.remove();
  }

  onDeath() {
    this.remove();
    game.player.level.exp += 40;
    game.score += 5;
  }

  remove() {
    const index = game.enemies.findIndex((enemy) => enemy.id === this.id);
    game.enemies.splice(index, 1);
    this.health.free();
    this.buff.free();
    this.#effectCleanup();
  }
}
