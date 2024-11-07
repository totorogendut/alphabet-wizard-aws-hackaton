import { expect, test } from "vitest";
import { animalEnemies } from "./animals";
import { existsSync } from "node:fs";
import chalk from "chalk";

test("sprite files exist", () => {
  for (const [enemy, { sprite }] of Object.entries(animalEnemies)) {
    const isExists = existsSync(`static${sprite}`);
    if (!isExists) console.log(chalk.bgRed.bold(" SPRITE 404 "), enemy, sprite);
    expect(isExists).toBe(true);
  }
});
