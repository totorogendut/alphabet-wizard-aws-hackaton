import { game } from "$lib/game.svelte";
import { items } from "$lib/items/items";
import type { ResourcesKey } from "$lib/resources/helper";

export function createItemListing(item: Item): Item & { buy: () => void } {
  const data = $state(item);
  const isCostSufficient = $derived(
    item.cost.every(({ amount, name }) => {
      return game.resources[name as ResourcesKey].amount >= amount;
    })
  );

  return {
    ...data,
    get isCostSufficient() {
      return isCostSufficient;
    },
    buy() {
      if (!isCostSufficient) {
        game.logs.push({
          type: "error",
          text: "Not enough resources",
        });

        return;
      }

      for (const { amount, name } of data.cost) {
        game.resources[name as ResourcesKey].amount -= amount;
      }

      game.items.push(item);
      game.logs.push({
        type: "success",
        text: `Bought ${item.title}`,
      });
    },
  };
}

export const shops = items.map(createItemListing);
