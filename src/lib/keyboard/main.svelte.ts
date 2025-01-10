import { game, gameTick } from "$lib/game.svelte";
import { resourcesList } from "$lib/resources/main.svelte";
import { damage } from "$lib/utils/damage";
import { delay, isNumber } from "$lib/utils/misc";
import { untrack } from "svelte";

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
    const isLastEmpty = this.text.slice(-1) === " ";

    if (this.args[0] === "gather")
      return this.args[1]
        ? resourcesList.filter((text) => text.startsWith(this.args[1]))
        : resourcesList;
    if (this.args[0] === "attack") return [];
    if (length <= 1)
      return availableCommands.filter(
        (text) => this.text === "" || text.includes(this.args[0])
      );

    return [];
  });

  readonly isCommandInvalid: boolean = $derived(
    !this.commandHelper?.length &&
      !!this.text.length &&
      this.args[0] !== "attack"
  );

  readonly showInputWarning: boolean = $derived(
    this.args[0] === "attack" || !this.commandHelper.length
  );

  readonly isEmpty: boolean = $derived(!this.text.length);

  #textSnapshot = $state("");
  #effectCleanup = $effect.root(() => {
    $effect(() => {
      const lengthDiff = this.text.length - this.#textSnapshot.length;
      if (lengthDiff > 1)
        untrack(() => {
          this.clear();
          game.logs.push({
            text: "Forbidden input - clearing the command!",
            type: "error",
          });
        });

      this.#textSnapshot = this.text;
    });
  });

  submit() {
    let correct = false;
    if (this.command === "attack") correct = this.#attack();
    // if (this.command === "upgrade") this.#upgrade();
    if (this.command === "gather") correct = this.#gather();
    if (!correct) this.#selfDamage();

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
      return false;
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

    return true;
  }
  #upgrade() {
    const target = this.args[1];
  }
  #gather() {
    const target = this.args[1] as keyof typeof game.resources;
    const amount = 25;

    if (!isNumber(game.resources[target]?.amount)) return false;
    game.resources[target].amount += amount;
    game.logs.push({
      text: `${amount} ${target} gathered.`,
      type: "success",
    });

    return true;
  }

  #selfDamage() {
    const { armor } = game.player.stats;
    const finalDamage = damage(game.player.stats.damage).armor(armor).taken;
    game.player.health.current -= finalDamage;

    game.logs.push({
      text: `You inflict ${finalDamage} to yourself due to inputing the wrong command.`,
      type: "error",
    });
  }
}
