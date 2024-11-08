import { newGateState, newPlayerStats } from "./utils/difficulty";
import {
  GlobalEnemyStats,
  type createEnemyEntity,
} from "./enemies/_store.svelte";
import { KeyboardSetup } from "./keyboard/main.svelte";
import { Player } from "./player/main.svelte";
import {
  moveEnemies,
  spawnEnemies,
  type enemySpawnGenerator,
} from "./enemies/main.svelte";
import { castSpells } from "./utils/spells";

class GameState {
  arena = $state<ArenaState>(newGateState.medium);
  player = $state<Player>(new Player());
  isPaused = $state<boolean>(false);
  enemies = $state<ReturnType<typeof createEnemyEntity>[]>([]);
  isDefeated = $derived<boolean>(this.player.health.current <= 0);
  difficulty = $state<Difficulty>("medium");
  keyboard = new KeyboardSetup();
  spawnPool = $state<ReturnType<typeof enemySpawnGenerator>[]>([]);
  spawnTime = $state(10);
  spawnCooldown = $state(this.spawnTime);
  globalEnemyStats = $state(new GlobalEnemyStats());

  constructor(difficulty: Difficulty) {
    this.arena = newGateState[difficulty];
    this.difficulty = difficulty;
  }
}

export function gameTick() {
  spawnEnemies();
  castSpells();
  moveEnemies();

  game.player.procs.onGameTick();
}

export let game = new GameState("medium");

export function restartGame() {
  game = new GameState(game.difficulty);
}
