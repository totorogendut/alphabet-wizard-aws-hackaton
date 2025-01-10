import armor from "$lib/assets/items/armor.svg";
import bag from "$lib/assets/items/bag.svg";
import book from "$lib/assets/items/book.svg";
import bow from "$lib/assets/items/bow.svg";
import crystal from "$lib/assets/items/crystal.svg";
import map from "$lib/assets/items/map.svg";
import potion from "$lib/assets/items/potion.svg";
import scroll from "$lib/assets/items/scroll.svg";
import sword from "$lib/assets/items/sword.svg";

export const items: Item[] = [
  {
    title: "Guard's Armor",
    description: "Come with a knee protection from arrow attacks.",
    cost: [{ amount: 60, name: "gold" }],
    bonusStats: {
      armor: 10,
      health: 30,
      resistance: {
        fire: 14,
        debuff: 6,
      },
    },
    icon: armor,
  },
  {
    title: "Syrup of Health",
    description: "Doctors recommendation beverage for wounded patients.",
    cost: [{ amount: 100, name: "gold" }],
    bonusStats: {
      regeneration: 4,
      resistance: {
        cold: 15,
        poison: 20,
      },
    },
    icon: potion,
  },
  {
    title: "Adventurer's Sword",
    description: "Get one of these before you brave the dangerous forests.",
    cost: [{ amount: 75, name: "gem" }],
    bonusStats: {
      damage: 30,
    },
    icon: sword,
  },
  {
    title: "Stable Magic Crystal",
    description: "WARNING: Do not eat.",
    cost: [{ amount: 110, name: "gem" }],
    bonusStats: {
      damageMultiplier: 1.16,
      healthMultiplier: 1.16,
    },
    icon: crystal,
  },
  {
    title: "Bow of Swift Wind",
    description: "Aim true despite drawing your arrow faster.",
    cost: [{ amount: 120, name: "lumber" }],
    bonusStats: {
      speed: 0.1,
      damage: 20,
      resistance: {
        lightning: 20,
      },
    },
    icon: bow,
  },
  {
    title: "Map",
    description: "Allow you to arrive to a desired location before others do.",
    cost: [{ amount: 200, name: "stone" }],
    bonusStats: {
      speed: 0.25,
      resistance: {
        debuff: 50,
      },
    },
    icon: map,
  },
  {
    title: "Scroll of Earth Magic",
    description:
      "A prerequisite read for mages in search for true enlightment.",
    cost: [{ amount: 60, name: "mineral" }],
    bonusStats: {
      damage: 16,
      armor: 16,
      resistance: {
        physical: 6,
      },
    },
    icon: scroll,
  },
  {
    title: "Book of True Insight",
    description:
      "A prerequisite read for mages in search for true enlightment.",
    cost: [{ amount: 150, name: "mineral" }],
    bonusStats: {
      damageMultiplier: 1.2,
      resistance: {
        debuff: 30,
      },
    },
    icon: book,
  },
  {
    title: "Survivor's Bag",
    description: "Get one in case of a disaster.",
    cost: [{ amount: 200, name: "food" }],
    bonusStats: {
      healthMultiplier: 1.3,
      resistance: {
        debuff: 30,
        fire: 50,
        cold: 50,
        lightning: 50,
      },
    },
    icon: bag,
  },
];
