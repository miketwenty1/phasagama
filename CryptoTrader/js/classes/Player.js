class Player extends Phaser.Physics.Arcade.Image {
  constructor (scene, x, y, key, frame) {
    super(scene, x, y, key, frame);
    this.scene = scene;
    this.velocity = 160;

    this.scene.physics.world.enable(this);
    this.setImmovable(false);

    this.setScale(2);
    this.setCollideWorldBounds(true);
    this.body.setAllowGravity(false);
    this.scene.add.existing(this);
    
  }
  update (cursors, pointer, playerx, playery) {

    // cursor
    this.body.setVelocity(0);
    if (cursors.up.isDown) {
      this.body.setVelocityY(-this.velocity);
    }
    else if (cursors.down.isDown) {
      this.body.setVelocityY(this.velocity);
    } else {
    }
    
    if (cursors.left.isDown) {
      this.body.setVelocityX(-this.velocity);
    } else if (cursors.right.isDown) {
      this.body.setVelocityX(this.velocity);
    } else {
    }


    // pointer for mobile
    if (pointer.isDown && pointer.y < pointer.downY) {
      this.body.setVelocityY(-this.velocity)
    }
    else if (pointer.isDown && pointer.y > pointer.downY) {
      this.body.setVelocityY(this.velocity);

    } else {
    }
    
    if (pointer.isDown && pointer.x < pointer.downX) {
      this.body.setVelocityX(-this.velocity);

    }
    else if (pointer.isDown && pointer.x > pointer.downX) {
      this.body.setVelocityX(this.velocity);

    } else {
    }
  
  }
}