export class KeyboardSetup {
  text = $state<string>("");
  args = $derived<string[]>(
    this.text
      .split(" ")
      .map((str) => str.trim())
      .filter(Boolean)
  );
}
