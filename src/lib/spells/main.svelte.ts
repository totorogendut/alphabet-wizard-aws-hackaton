import { game } from "$lib/game.svelte";
import { Player } from "$lib/player/main.svelte";
import { LevelingBase } from "$lib/utils/leveling.svelte";
import { untrack } from "svelte";
import { fireball } from "./fire";

type SpellsType = ProjectileSpell | AreaSpell | DurationSpell;
export class Spells {
  level = new LevelingBase();
  cooldown = $state(0);
  instances = $state([]);
  spell = $state<SpellsType>();
  tags = $derived.by<SpellsTag[]>(() => {
    if (!this.spell) return [];
    const results: SpellsTag[] = [];
    if ("area" in this.spell) results.push("area");
    if ("projectile" in this.spell) results.push("projectile");
    if ("duration" in this.spell) results.push("duration");
    if (this.spell?.type) results.push(...this.spell.type);

    return results;
  });

  #effectCleanup = $effect.root(() => {
    $effect(() => {
      if (!game.turn) return;
      untrack(() => {
        this.tick();
      });
    });
  });

  constructor(spell: SpellsType) {
    this.spell = spell;
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

  free() {
    this.#effectCleanup();
  }
}
