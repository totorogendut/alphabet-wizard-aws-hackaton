export function setupHealth(val: number) {
  let max = $state(val);
  let current = $state(val);
  const percentage = $derived(current / max);
  const isLowHealth = $derived(percentage <= 0.5);
  const isHighHealth = $derived(percentage >= 0.85);
  const isFullHealth = $derived(percentage >= 1);

  return {
    get percentage() {
      return percentage;
    },
    get isLowHealth() {
      return isLowHealth;
    },
    get isHighHealth() {
      return isHighHealth;
    },
    get isFullHealth() {
      return isFullHealth;
    },
    get current() {
      return current;
    },
    set current(val: number) {
      current = Math.max(Math.min(val, max), 0);
    },
    get max() {
      return max;
    },
    set max(val: number) {
      const currentHealth = max / current;
      max = val;
      current = max * currentHealth;
    },
  };
}
