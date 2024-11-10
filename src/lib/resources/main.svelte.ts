import gold from "$lib/assets/icons/resources/gold.png";
import lumber from "$lib/assets/icons/resources/lumber.png";
import food from "$lib/assets/icons/resources/food.png";
import quartz from "$lib/assets/icons/resources/quartz.png";
import amber from "$lib/assets/icons/resources/amber.png";
import stone from "$lib/assets/icons/resources/stone.png";

export class ResourcesData {
  gold = $state<Resource>({
    name: "gold",
    amount: 150,
    icon: gold,
  });
  food = $state<Resource>({
    name: "food",
    amount: 100,
    icon: food,
  });
  lumber = $state<Resource>({
    name: "lumber",
    amount: 0,
    icon: lumber,
  });
  quartz = $state<Resource>({
    name: "quartz",
    amount: 0,
    icon: quartz,
  });
  amber = $state<Resource>({
    name: "amber",
    amount: 0,
    icon: amber,
  });
  stone = $state<Resource>({
    name: "stone",
    amount: 0,
    icon: stone,
  });
}
