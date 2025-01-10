import { game } from "$lib/game.svelte";
import { resourcesList } from "$lib/resources/main.svelte";
import { Buffs } from "$lib/ststs/buffs..svelte";
import { damage } from "$lib/utils/damage";
import { Health } from "$lib/utils/health.svelte";
import { getRandomItems } from "$lib/utils/misc";
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
    this.health = new Health(this.stats);
    this.pos = setupPosition({
      x: Math.max(Math.random() * 90, 10),
      y: 0,
    });

    const type = stats.type as keyof typeof faker;
    const subType = stats.subType as keyof typeof faker.animal;
    this.text = faker.animal?.[subType]?.()?.toLowerCase?.() || "lol";
  }

  attack() {
    const { armor } = game.player.stats;
    // TODO - damage type and apply resistances
    game.player.health.current -= damage(this.stats.damage).armor(armor).taken;
    this.remove();
  }

  onDeath() {
    this.remove();
    const difficulty = Math.max(0, this.text.length - 10);
    const loot: Record<string, number> = {
      exp: 40,
    };
    game.player.level.exp += loot.exp;
    game.score += 5 + this.baseStats.power + difficulty * 2;

    const resources = getRandomItems(resourcesList, 1, 3) as string[];

    for (const resource of resources) {
      const amount = 10 + this.baseStats.power + difficulty * 3;
      game.resources[resource as keyof typeof game.resources].amount += amount;
      loot[resource] = amount;
    }

    game.logs.push({
      type: "success",
      text: `You gain ${Object.keys(loot)
        .map((key) => `${loot[key]} ${key}`)
        .join(", ")} from killing ${this.text}`,
    });
  }

  remove() {
    const index = game.enemies.findIndex((enemy) => enemy.id === this.id);
    game.enemies.splice(index, 1);
    this.health.free();
    this.buff.free();
    this.#effectCleanup();
  }
}
