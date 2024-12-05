import gold from "$lib/assets/icons/resources/gold.png";
import lumber from "$lib/assets/icons/resources/lumber.png";
import food from "$lib/assets/icons/resources/food.png";
import quartz from "$lib/assets/icons/resources/quartz.png";
import amber from "$lib/assets/icons/resources/amber.png";
import stone from "$lib/assets/icons/resources/stone.png";

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
  quartz = $state<Resource>({
    name: "quartz",
    amount: 1000,
    icon: quartz,
  });
  amber = $state<Resource>({
    name: "amber",
    amount: 1000,
    icon: amber,
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
      name: "quartz",
      amount: 0,
      icon: quartz,
    },
    {
      name: "amber",
      amount: 0,
      icon: amber,
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
