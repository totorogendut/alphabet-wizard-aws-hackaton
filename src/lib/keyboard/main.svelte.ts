import { game, gameTick } from "$lib/game.svelte";
import { damage } from "$lib/utils/damage";
import { delay, isNumber } from "$lib/utils/misc";

const availableCommands = ["attack", "gather"] as const;
type AvailableCommands = (typeof availableCommands)[number];

export class KeyboardSetup {
  text = $state<string>("");
  turnPenalty = $state<number>(3);
  readonly args = $derived<string[]>(
    this.text
      .split(" ")
      .map((str) => str.trim())
      .filter(Boolean)
  );

  readonly command = $derived<AvailableCommands | "">(
    availableCommands.includes(this.args[0] as AvailableCommands)
      ? (this.args[0] as AvailableCommands)
      : ""
  );

  readonly commandHelper = $derived.by(() => {
    const length = this.args.length;

    if (length <= 1)
      return availableCommands.filter(
        (text) => this.text === "" || text.includes(this.args[0])
      );

    return [];
  });

  readonly isCommandInvalid: boolean = $derived(
    !this.commandHelper?.length && !!this.text.length
  );
  readonly isEmpty: boolean = $derived(!this.text.length);

  submit() {
    if (this.command === "attack") this.#attack();
    // if (this.command === "upgrade") this.#upgrade();
    if (this.command === "gather") this.#gather();

    this.clear();
  }

  async cancel() {
    this.clear();
    game.logs.push({
      text: `Typing is canceled - paid ${this.turnPenalty} turns penalty.`,
      type: "error",
    });

    for (let index = 0; index < this.turnPenalty; index++) {
      gameTick();
      await delay(0.3);
    }
  }

  clear() {
    this.text = "";
  }

  #attack() {
    const target = this.args.slice(1).join(" ").trim().toLowerCase();
    const enemyIndex = game.enemies.findIndex((e) => e.text === target);

    if (enemyIndex === -1) {
      game.logs.push({
        text: "Attack missed.",
        type: "error",
      });
      return;
    }
    const stats = game.enemies[enemyIndex].stats;
    const finalDamage = damage(game.player.stats.damage).armor(
      stats.armor
    ).taken;
    game.enemies[enemyIndex].health.current -= finalDamage;
    game.logs.push({
      text: `You deal ${finalDamage} to ${target}.`,
      type: "battle",
    });
  }
  #upgrade() {
    const target = this.args[1];
  }
  #gather() {
    const target = this.args[1] as keyof typeof game.resources;
    const amount = 25;

    if (!isNumber(game.resources[target]?.amount)) return;
    game.resources[target].amount += amount;
    game.logs.push({
      text: `${amount} ${target} gathered.`,
      type: "success",
    });
  }
}
