type SpellsTag = SpellsTypeTag | DamageType;
type SpellsTypeTag = "projectile" | "area" | "duration";

interface SpellBase {
  cooldown: number;
  sprite: string;
  icon: string;
  type: DamageType[];
}

interface AreaSpell extends SpellBase {
  area: {
    radius: number;
  };
}

interface ProjectileSpell extends SpellBase {
  projectile: {
    speed: number;
    radius: number;
    duration: number;
    chain: number;
    chainRange: number;
    pierce: number;
    count: number;
    fork: number;
  };
}

interface DurationSpell extends SpellBase {
  duration: {
    time: number;
    dispelable: boolean;
  };
}
