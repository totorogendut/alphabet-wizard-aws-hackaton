import { createEnemyEntity } from "$lib/enemies/_store.svelte";
import { animalEnemies } from "$lib/enemies/animals";
import { game } from "$lib/game.svelte";
import { nanoid } from "nanoid";

export function moveEnemies() {
  for (let i = 0; i < game.enemies.length; i++) {
    const enemy = game.enemies[i];
    enemy.pos.y += enemy.speed;

    if (enemy.pos.y >= 100) {
      game.player.health.current -= enemy.damage;
      game.enemies.splice(i, 1);
    }
  }
}

export function spawnEnemies() {
  game.spawnCooldown--;

  if (game.spawnCooldown <= 0) {
    const enemy = animalEnemies.wolf;
    game.spawnCooldown = game.spawnTime;
    game.spawnPool.push(enemySpawnGenerator(enemy));
  }

  for (const { createEnemy, spawn } of game.spawnPool) {
    createEnemy();
  }

  game.spawnPool = game.spawnPool.filter(({ spawn }) => Boolean(spawn));
}

export function enemySpawnGenerator(enemy: EnemyStats) {
  let spawn = $state(enemy.spawn);

  return {
    get spawn() {
      return spawn;
    },
    createEnemy() {
      spawn--;
      game.enemies.push(createEnemyEntity(enemy));
    },
  };
}
