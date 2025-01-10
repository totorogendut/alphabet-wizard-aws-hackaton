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

      game.player.items.push(item);
      game.logs.push({
        type: "success",
        text: `Bought ${item.title}`,
      });
    },
  };
}

export const shops = items.map(createItemListing);

// export class ItemListing {
//   data = $state() as Item;
//   isCostSufficient = $derived.by(() => {
//     let result = true;

//     for (const data of this.data.cost) {
//       const resource = data.name as keyof typeof game.resources;
//       if (game.resources[resource].amount >= data.amount) continue;
//       result = false;
//       break;
//     }

//     return result;
//     // return this.data.cost.every(({ amount, name }) => {
//     //   return game.resources[name as ResourcesKey].amount >= amount;
//     // });
//   });

//   constructor(data: Item) {
//     this.data = data;
//     console.log(this.data);
//   }

//   buy() {
//     console.log(this.data?.cost, this.isCostSufficient);
//     if (!this.isCostSufficient) {
//       game.logs.push({
//         type: "error",
//         text: "Not enough resources",
//       });

//       return;
//     }

//     for (const { amount, name } of this.data.cost) {
//       game.resources[name as ResourcesKey].amount -= amount;
//     }

//     game.player.items.push(this.data);
//     game.logs.push({
//       type: "success",
//       text: `Bought ${this.data.title}`,
//     });
//   }
// }

// export const shops = items.map((item) => new ItemListing(item));
