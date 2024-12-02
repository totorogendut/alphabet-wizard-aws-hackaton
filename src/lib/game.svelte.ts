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
import { ResourcesData, setupResources } from "./resources/main.svelte";

export class GameState {
  turn = $state(0);
  arena = $state() as ArenaState;
  player = new Player(this);
  keyboard = new KeyboardSetup();
  globalEnemyStats = new GlobalEnemyStats();
  resources = new ResourcesData();
  isPaused = $state<boolean>(false);
  enemies = $state<ReturnType<typeof createEnemyEntity>[]>([]);
  items = $state<Item[]>([]);
  difficulty = $state<Difficulty>("medium");
  spawnPool = $state<ReturnType<typeof enemySpawnGenerator>[]>([]);
  spawnTime = $state(10);
  spawnCooldown = $state(this.spawnTime);
  logs = $state<MessageLogs[]>([]);
  isDefeated = $derived<boolean>(this.player.health.current <= 0);

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
  game.turn++;
}

export let game = new GameState("medium");

export function restartGame() {
  game = new GameState(game.difficulty);
}
