import { game } from "$lib/game.svelte";
import { fireball } from "./fire";

export class Spells {
  cooldown = $state(0);
  level = $state(1);
  exp = $state(0);
  expNextLevel = $derived.by(() => {
    if (this.level < 3) return (this.level + 1) * 100;
    if (this.level < 5) return (this.level + 1) * 150;
    if (this.level < 7) return (this.level + 1) * 230;
    if (this.level < 9) return (this.level + 1) * 400;
    return (this.level + 1) * 1000;
  });

  instances = $state([]);

  spell = $state<ProjectileSpell | AreaSpell | DurationSpell>();
  tags = $derived.by<string[]>(() => {
    if (!this.spell) return [];
    const results: SpellsTag[] = [];
    if ("area" in this.spell) results.push("area");
    if ("projectile" in this.spell) results.push("projectile");
    if ("duration" in this.spell) results.push("duration");
    if (this.spell?.type) results.push(...this.spell.type);

    return results;
  });

  constructor(spell: typeof this.spell) {
    this.spell = spell;
  }

  gainExp(exp: number) {
    if (this.level === 10) return;
    this.exp += exp;
    if (this.exp >= this.expNextLevel) {
      this.exp -= this.expNextLevel;
      this.level++;
    }

    if (this.level === 10) this.exp = this.expNextLevel;
  }

  tick() {
    if (this.cooldown <= 0) {
      this.cast();
      this.cooldown = this.spell?.cooldown || 1;
    } else {
      this.cooldown -= game.player.stats.speed;
    }
  }

  cast() {}
}
