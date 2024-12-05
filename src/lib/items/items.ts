import Shield from "$lib/assets/icons/miscs/item101.png";
import Ring from "$lib/assets/icons/miscs/item102.png";

export const items: Item[] = [
  {
    title: "Shield",
    description: "A poor man's shield.",
    cost: [{ amount: 60, name: "gold" }],
    bonusStats: {
      armor: 10,
      health: 30,
      resistance: {
        cold: 14,
        debuff: 6,
      },
    },
    icon: Shield,
  },
  {
    title: "Ring of Health",
    description: "Doctors recommendation trinket for wounded patients.",
    cost: [{ amount: 200, name: "gold" }],
    bonusStats: {
      healthMultiplier: 1.07,
      regeneration: 7,
    },
    icon: Ring,
  },
  {
    title: "Magick Ring",
    description: "Basic ring popular with mage apprentices.",
    cost: [{ amount: 6, name: "amber" }],
    bonusStats: {
      damage: 30,
      resistance: {
        debuff: 30,
      },
    },
    icon: Ring,
  },
];
