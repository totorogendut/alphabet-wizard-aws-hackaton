interface EnemyStats extends BaseStats {
  power: number; // between 1 ~ 10
  sprite: string | Picture; // starts with /sprites/<type>/<key>.png
  size: number; // between 2 ~ 6
  spawn: number; // between 4 ~ 10
  type: string;
  subType: string;
  /**
   * The less the spawn stats the more health and damage it has. The
   * opposite is also aplied, the more spawn stats the less health it has.
   * Generally enemy that is has small number of spawn is big creatures like
   * ogre, bears, whale, and so on based on the type of the creatures.
   */
}
