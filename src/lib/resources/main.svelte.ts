import gold from "$lib/assets/resources/gold.svg";
import lumber from "$lib/assets/resources/lumber.svg";
import food from "$lib/assets/resources/food.svg";
import mineral from "$lib/assets/resources/mineral.svg";
import gem from "$lib/assets/resources/gem.svg";
import stone from "$lib/assets/resources/stone.svg";

export const resourcesList = [
  "gold",
  "food",
  "lumber",
  "mineral",
  "gem",
  "stone",
];

export class ResourcesData {
  gold = $state<Resource>({
    name: "gold",
    amount: 0,
    icon: gold,
  });
  food = $state<Resource>({
    name: "food",
    amount: 0,
    icon: food,
  });
  lumber = $state<Resource>({
    name: "lumber",
    amount: 0,
    icon: lumber,
  });
  mineral = $state<Resource>({
    name: "mineral",
    amount: 0,
    icon: mineral,
  });
  gem = $state<Resource>({
    name: "gem",
    amount: 0,
    icon: gem,
  });
  stone = $state<Resource>({
    name: "stone",
    amount: 0,
    icon: stone,
  });
}
