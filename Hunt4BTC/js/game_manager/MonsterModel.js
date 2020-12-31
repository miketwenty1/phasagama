class MonsterModel {
  constructor(x,y,bitcoin,spawnerId, frame, health, attack) {
    this.id = `${spawnerId}-${uuid.v4()}`;
    this.spawnerId = spawnerId;
    this.x = x;
    this.y = y;
    this.bitcoin = bitcoin;
    this.frame = frame;
    this.health = health;
    this.maxHealth = health;
    this.attack = attack;
    console.log('health: '+this.health+'  maxhealth: '+this.maxHealth);
  }
  loseHealth(damage) {
    console.log('spawnerid: '+this.spawnerId+'health: '+this.health+'  maxhealth: '+this.maxHealth+'frame: '+this.frame);
    this.health -= damage;
    console.log('spawnerid: '+this.spawnerId+'health: '+this.health+'  maxhealth: '+this.maxHealth+'frame: '+this.frame);
  }
}