import Shield from "$lib/assets/icons/miscs/item101.png";

export const items: Item[] = [
  {
    title: "Shield",
    description: "A poor man's shield.",
    cost: [{ amount: 20, name: "gold" }],
    buffs: [
      {
        armor: 10,
        resistance: {
          cold: 14,
          debuff: 6,
        },
      },
    ],
    icon: Shield,
  },
  {
    title: "Magick Ring",
    description: "Basic ring popular with mage apprentices.",
    cost: [{ amount: 6, name: "amber" }],
    buffs: [
      {
        damage: 30,
        resistance: {
          debuff: 30,
        },
      },
    ],
    icon: Shield,
  },
];