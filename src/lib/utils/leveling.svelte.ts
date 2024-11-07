export class ExperienceBase {
  level = $state<number>(1);
  #exp = $state<number>(0);
  expNextLevel = $derived.by(() => {
    if (this.level < 3) return (this.level + 1) * 100;
    if (this.level < 5) return (this.level + 1) * 150;
    if (this.level < 7) return (this.level + 1) * 230;
    if (this.level < 9) return (this.level + 1) * 400;
    return (this.level + 1) * 1000;
  });

  set exp(val: number) {
    this.#exp = val;
    if (this.#exp >= this.expNextLevel) {
      this.#exp -= this.expNextLevel;
      this.level++;
    }
  }

  get exp() {
    return this.#exp;
  }
}
