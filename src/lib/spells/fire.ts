export const fireball: ProjectileSpell & AreaSpell = {
  cooldown: 4,
  sprite: "",
  icon: "",
  type: ["fire"],
  projectile: {
    speed: 3,
    radius: 2,
  },
  area: {
    radius: 5.5,
  },
};
