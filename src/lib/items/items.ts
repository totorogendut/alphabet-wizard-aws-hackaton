import Shield from "$lib/assets/icons/miscs/item101.png";

export const items: Item[] = [
  {
    title: "Shield",
    description: "A poor man's shield.",
    cost: [{ amount: 10, name: "gold" }],
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
    description: "Health ring",
    cost: [{ amount: 20, name: "gold" }],
    bonusStats: {
      healthMultiplier: 1.07,
      regeneration: 16,
    },
    icon: Shield,
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
    icon: Shield,
  },
];
