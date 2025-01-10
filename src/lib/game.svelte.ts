import { newGateState } from "./utils/difficulty";
import type { EnemyEntity } from "./enemies/_store.svelte";
import { KeyboardSetup } from "./keyboard/main.svelte";
import { Player } from "./player/main.svelte";
import {
  moveEnemies,
  spawnEnemies,
  type enemySpawnGenerator,
} from "./enemies/main.svelte";
import { castSpells } from "./utils/spells";
import { ResourcesData } from "./resources/main.svelte";
import { untrack } from "svelte";

export class GameState {
  turn = $state(0);
  score = $state(0);
  arena = $state() as ArenaState;
  player = new Player();
  keyboard = new KeyboardSetup();
  globalEnemyStats = $state({
    healthMultiplier: 1,
    damageMultiplier: 1,
  });
  resources = new ResourcesData();
  isPaused = $state<boolean>(false);
  enemies = $state<EnemyEntity[]>([]);
  difficulty = $state<Difficulty>("medium");
  spawnPool = $state<ReturnType<typeof enemySpawnGenerator>[]>([]);
  spawnTime = $state(10);
  spawnCooldown = $state(this.spawnTime);
  logs = $state<MessageLogs[]>([]);
  isDefeated = $derived<boolean>(this.player.health.current <= 0);
  #effectCleanup = $effect.root(() => {
    $effect(() => {
      this.addMonsterStats();
    });
  });

  constructor(difficulty: Difficulty) {
    this.arena = newGateState[difficulty];
    this.difficulty = difficulty;
  }

  free() {
    this.player.free();
    for (const enemy of this.enemies) enemy.remove();
    this.#effectCleanup();
  }

  addMonsterStats() {
    const bonus = 0.05;
    const turnInterval = 500;

    if (this.turn % turnInterval === 0 && this.turn)
      untrack(() => {
        this.logs.push({
          text: `Enemy stats increased by ${bonus * 100}%`,
          type: "error",
        });

        this.globalEnemyStats.healthMultiplier += bonus;
        this.globalEnemyStats.damageMultiplier += bonus;
      });
  }
}

export function gameTick() {
  spawnEnemies();
  castSpells();
  moveEnemies();

  // game.player.procs.onGameTick();
  game.turn++;
}

export let game = new GameState("medium");

export function restartGame() {
  game.free();
  game = new GameState(game.difficulty);
  window.location.reload();
}
