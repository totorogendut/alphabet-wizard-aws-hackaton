import { game } from "$lib/game.svelte";

type ResourceKey = keyof typeof game.resources;
export function createItemListing(item: Item): Item {
  const cost = $state(item.cost);
  const isCostSufficient = $derived(
    cost.every(({ amount, name }) => {
      return game.resources[name as ResourceKey].amount >= amount;
    })
  );
  const procs = $state(item.procs);
  const buffs = $state(item.buffs);

  return {
    get cost() {
      return cost;
    },
    get isCostSufficient() {
      return isCostSufficient;
    },
    get buffs() {
      return buffs;
    },
    get procs() {
      return procs;
    },
    icon: item.icon,
  };
}
