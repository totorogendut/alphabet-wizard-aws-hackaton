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
    icon: (await import("$lib/assets/items/armor.svg")).default,
  },
  {
    title: "Syrup of Health",
    description: "Doctors recommendation beverage for wounded patients.",
    cost: [{ amount: 100, name: "gold" }],
    bonusStats: {
      healthMultiplier: 1.07,
      regeneration: 7,
    },
    icon: (await import("$lib/assets/items/potion.svg")).default,
  },
  {
    title: "Adventurer's Sword",
    description: "Get one of these before you brave the dangerous forests.",
    cost: [{ amount: 75, name: "gem" }],
    bonusStats: {
      damage: 30,
      resistance: {
        debuff: 30,
      },
    },
    icon: (await import("$lib/assets/items/sword.svg")).default,
  },
];
