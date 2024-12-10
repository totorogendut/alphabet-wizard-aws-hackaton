import { game, gameTick } from "$lib/game.svelte";
import { delay } from "$lib/utils/misc";

const availableCommands = ["spell", "upgrade", "resource"] as const;
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

  readonly isCommandInvalid: boolean = $derived(
    !this.command && !!this.text.length
  );
  readonly isEmpty: boolean = $derived(!this.text.length);

  submit() {
    if (this.command === "spell") this.#spell();
    if (this.command === "upgrade") this.#upgrade();
    if (this.command === "resource") this.#resource();

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

  #spell() {
    const spellName = this.args[1];
    const target = this.args[2];
  }
  #upgrade() {
    const target = this.args[1];
  }
  #resource() {
    const target = this.args[1];
  }
}
