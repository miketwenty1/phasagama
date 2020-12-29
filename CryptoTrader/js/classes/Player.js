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
    // DOWN
    if (pointer.isDown && pointer.y < pointer.downY) {
      let intensity = 0;
      if (pointer.downY-pointer.y > 50)
      {
        intensity = 1;
        this.body.setVelocityY(-this.velocity*intensity)
      } else {
        intensity = (((pointer.downY-pointer.y)*2)/100);
        this.body.setVelocityY(-this.velocity*intensity)
      }
    // UP
    }
    else if (pointer.isDown && pointer.y > pointer.downY) {
      // console.log('up');
      let intensity = 0;
      if (pointer.y-pointer.downY > 50 )
      {
        // console.log('super up');
        intensity = 1;
        this.body.setVelocityY(this.velocity*intensity);
      } else {
        intensity = (((pointer.y-pointer.downY)*2)/100);
        this.body.setVelocityY(this.velocity*intensity);
      }
      
    } else {
    }
    // LEFT
    if (pointer.isDown && pointer.x < pointer.downX) {
      let intensity = 0;
      // console.log('left');
      if (pointer.downX-pointer.x > 50 )
      {
        intensity = 1;
        this.body.setVelocityX(-this.velocity*intensity);
      } else {
        intensity = (((pointer.downX-pointer.x)*2)/100);
        this.body.setVelocityX(-this.velocity*intensity);
      }
    // RIGHT
    }
    else if (pointer.isDown && pointer.x > pointer.downX) {
      let intensity = 0;
      if (pointer.x-pointer.downX > 50 )
      {
        intensity = 1;
        this.body.setVelocityX(this.velocity*intensity);
      } else {
        intensity = (((pointer.x-pointer.downX)*2)/100);
        this.body.setVelocityX(this.velocity*intensity);
      }
      
    } else {
    }
  
  }
}