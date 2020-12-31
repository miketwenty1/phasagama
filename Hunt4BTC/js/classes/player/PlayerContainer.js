const Direction = {
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
  UP: 'UP',
  DOWN: 'DOWN'
};
const Mode = {
  EASY: 10,
  MEDIUM: 5,
  HARD: 3,
  INSANE: 1
}

class PlayerContainer extends Phaser.GameObjects.Container {
  constructor (scene, x, y, key, frame) {
    super(scene, x, y);
    this.scene = scene;
    this.velocity = 360;
    this.currentDirection = Direction.RIGHT;
    this.playerAttacking = false;
    this.flipX = true;
    this.swordHit = false;

    this.setSize(32 * Scale.FACTOR,32 * Scale.FACTOR);
    this.scene.physics.world.enable(this);
    this.body.setCollideWorldBounds(true);
    this.body.setAllowGravity(false);
    this.scene.add.existing(this);

    // have the camera follow the player
    this.scene.cameras.main.startFollow(this);
    
    this.player = new Player(this.scene, 0, 0, key, frame);
    this.add(this.player);

    // weapon
    this.weapon = this.scene.add.image(32,-10,'items',4);
    this.scene.add.existing(this.weapon);
    this.weapon.setScale(Scale.FACTOR*.75);
    this.scene.physics.world.enable(this.weapon);
    this.add(this.weapon);
    this.weapon.alpha = 0;

  }
  update (cursors) {

    // cursor
    this.body.setVelocity(0);
    if (cursors.up.isDown || cursors.w.isDown) {
      // console.log(cursors);
      this.body.setVelocityY(-this.velocity);
      this.currentDirection = Direction.UP;
      this.weapon.setPosition(-30,-13);

    }
    else if (cursors.down.isDown || cursors.s.isDown) {
      this.body.setVelocityY(this.velocity);
      this.currentDirection = Direction.DOWN;
      this.weapon.setPosition(20,20);
    } else {
    }
    
    if (cursors.left.isDown || cursors.a.isDown) {
      this.body.setVelocityX(-this.velocity);
      this.currentDirection = Direction.LEFT;
      this.weapon.setPosition(-32,-10);
      this.player.flipX = false;
    } else if (cursors.right.isDown || cursors.d.isDown) {
      this.body.setVelocityX(this.velocity);
      this.currentDirection = Direction.RIGHT;
      this.weapon.setPosition(32,-10);
      this.player.flipX = true;
    } else {
    }
    
    if (Phaser.Input.Keyboard.JustDown(cursors.space) && !this.playerAttacking ) {
      this.weapon.alpha = 1;
      this.playerAttacking = true;
      this.scene.time.delayedCall(150, () => {
        this.weapon.alpha = 0;
        this.playerAttacking = false;
        this.swordHit = false;
      }, [], this);
    }
    if (this.playerAttacking) {
      if (this.weapon.flipX == true) {
        this.weapon.angle -= 10;
      } else {
        this.weapon.angle += 10;
      }

    } else {
      if (this.currentDirection === Direction.DOWN) {
        this.weapon.setAngle(-270);
      } else if (this.currentDirection === Direction.UP) {
        this.weapon.setAngle(-64);
      } else {
        this.weapon.setAngle(0);
      }
      this.weapon.flipX = false;
      if (this.currentDirection === Direction.LEFT) {
        this.weapon.flipX = true;
      }
    }
  
  }
}