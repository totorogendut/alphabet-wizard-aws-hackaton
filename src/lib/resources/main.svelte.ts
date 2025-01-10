import gold from "$lib/assets/resources/gold.svg";
import lumber from "$lib/assets/resources/lumber.svg";
import food from "$lib/assets/resources/food.svg";
import mineral from "$lib/assets/resources/mineral.svg";
import gem from "$lib/assets/resources/gem.svg";
import stone from "$lib/assets/resources/stone.svg";

export class ResourcesData {
  gold = $state<Resource>({
    name: "gold",
    amount: 1000,
    icon: gold,
  });
  food = $state<Resource>({
    name: "food",
    amount: 1000,
    icon: food,
  });
  lumber = $state<Resource>({
    name: "lumber",
    amount: 1000,
    icon: lumber,
  });
  mineral = $state<Resource>({
    name: "mineral",
    amount: 1000,
    icon: mineral,
  });
  gem = $state<Resource>({
    name: "gem",
    amount: 1000,
    icon: gem,
  });
  stone = $state<Resource>({
    name: "stone",
    amount: 1000,
    icon: stone,
  });
}

export function setupResources() {
  const data = $state([
    {
      name: "gold",
      amount: 150,
      icon: gold,
    },
    {
      name: "lumber",
      amount: 0,
      icon: lumber,
    },
    {
      name: "mineral",
      amount: 0,
      icon: mineral,
    },
    {
      name: "gem",
      amount: 0,
      icon: gem,
    },
    {
      name: "stone",
      amount: 0,
      icon: stone,
    },
    {
      name: "food",
      amount: 100,
      icon: food,
    },
  ]);
  return data;

  function del() {
    // const index = game.resources.findIndex((res) => res.name === name);
  }
}
