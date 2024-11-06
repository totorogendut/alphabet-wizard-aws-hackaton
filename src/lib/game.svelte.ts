import { newGateState, newPlayerState } from "./difficulty";
import {
  GlobalEnemyStats,
  type createEnemyEntity,
} from "./enemy/_store.svelte";
import { KeyboardSetup } from "./keyboard.svelte";
import {
  moveEnemies,
  spawnEnemies,
  type enemySpawnGenerator,
} from "./utils/enemies.svelte";
import { castSpells } from "./utils/spells";

class GameState {
  arena = $state<ArenaState>(newGateState.medium);
  player = $state<PlayerState>(newPlayerState);
  isPaused = $state<boolean>(false);
  enemies = $state<ReturnType<typeof createEnemyEntity>[]>([]);
  isDefeated = $derived<boolean>(this.player.health <= 0);
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
}

export let game = new GameState("medium");

export function restartGame() {
  game = new GameState(game.difficulty);
}
