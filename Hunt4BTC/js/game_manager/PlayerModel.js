class PlayerModel {
  constructor(spawnLocations) {
    this.health = 100;
    this.maxHealth = 100;
    this.bitcoin = 0;
    this.id = `player-${uuid.v4()}`;
    this.spawnLocations = spawnLocations;

    const location = this.spawnLocations[Math.floor(Math.random() * this.spawnLocations.length)];
    //short hand to set 2 values 1st and 2nd item of location array
    [this.x, this.y] = location;
  }
}