// create a new scene
let dragonGlobalCount = 1;
let level = 1;
let bossSpeed = 2;
let gameScene = new Phaser.Scene('Game');

let getLevel=function(){
  console.log(level);
  return level;
}

// init
gameScene.init = function() {
  this.playerSpeed = 3;
  this.dragonBottomBound = this.sys.game.config.height-30;
  this.dragonTopBound = 30;
  this.dragonGoDown = true;
  this.terminating = false;
  this.dragonCount = dragonGlobalCount;
}

// Load assets
gameScene.preload = function() {
  // Load images
  this.load.image('background', 'assets/background.png');
  this.load.image('player', 'assets/player.png');
  this.load.image('dragon', 'assets/dragon.png');
  this.load.image('dragonboss', 'assets/dragonboss.png');
  this.load.image('treasure', 'assets/btc.png');
};




// called once after the preload ends
gameScene.create = function() {
  // breate bg sprite
  let bg = this.add.sprite(0, 0, 'background');


  bg.setPosition(bg.width/2, bg.height/2);

  this.player = this.add.sprite(40, this.sys.game.config.height/2, 'player');
  this.player.depth = 1;
  this.player.setScale(0.5);

  this.treasure = this.add.sprite(this.sys.game.config.width-60, this.sys.game.config.height/2, 'treasure');
  this.treasure.setScale(.6);

  this.dragons = this.add.group({
    key: 'dragon',
    repeat: this.dragonCount,
    setXY: {
      x: 110,
      y: 100,
      stepX: 40,
      stepY: 20,

    }
  });

  this.dragon = this.add.sprite(this.sys.game.config.width-100, this.sys.game.config.height/2, 'dragonboss');
  this.dragons.add(this.dragon);
  Phaser.Actions.ScaleXY(this.dragons.getChildren(), -0.4, -0.4);
  this.dragon.setScale(1.15);
  
  // this.dragons.children.each(entity => entity.flipX = true);
  Phaser.Actions.Call(this.dragons.getChildren(), function(dragon){

    dragon.flipX = true;

    let dragonSpeed = Math.random() < 0.5 ? 3 : 1;
    let dir = Math.random() < 0.5 ? 1 : -1;
    // console.log(dragonSpeed);
    dragon.speed = dir * dragonSpeed;
    // console.log(this.dragon.speed);

  }, this);
  this.dragon.speed = bossSpeed;
  // console.log(dir);
  // this.treasure = this.add.sprite(this.sys.game.config.width-40, this.sys.game.config.height/2);
};

gameScene.update = function() {
  if (this.terminating) return;

  if (this.input.activePointer.isDown)  {
    this.player.x += this.playerSpeed;

  }
  let playerRect = this.player.getBounds();
  let treasureRect = this.treasure.getBounds();
  if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)) {
    console.log("yay treasure!");
    // restart game
    return this.gameOver("win");
  }
  let dragons = this.dragons.getChildren();

  let numDragons = dragons.length;

  for (let i = 0; i < numDragons; i++) {

    dragons[i].y += dragons[i].speed;


    let conditionUp = dragons[i].speed < 0 && dragons[i].y <= this.dragonTopBound;
    let conditionDown = dragons[i].speed > 0 && dragons[i].y >= this.dragonBottomBound;
    // change direction up or down
    if (conditionUp || conditionDown) {
      dragons[i].speed *= -1;
      // console.log('top');
    }
    let dragonRect = dragons[i].getBounds();

    // console.log(dragonRect);
    // collision with player and dragon
    // if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, dragonRect)) {
    if (Phaser.Geom.Intersects.RectangleToValues(playerRect, dragonRect.left, dragonRect.right, dragonRect.top, dragonRect.bottom, -13)) {
      console.log("ouch!");
      // restart game
      return this.gameOver();
    }
  }

};


gameScene.gameOver = function(result) {

  if (result == "win" && !this.terminating) {
    this.terminating = true;
    console.log("You Won!");
    this.cameras.main.fade(500);
    this.cameras.main.on('camerafadeoutcomplete', function(camera, effect){
      dragonGlobalCount += 1;
      bossSpeed += .5;
      level += 1;
      document.getElementById("levelh1").innerHTML = "Level "+level;
      console.log(level);
      this.scene.restart();
      return;
    }, this);
  }
  else{
    if (!this.terminating) {
      this.terminating = true;
      // shake screen
      this.cameras.main.shake(500);
      // listen for completion
      this.cameras.main.on('camerashakecomplete', function(camera, effect){
  
        this.cameras.main.fade(500);
      }, this);
  
  
      this.cameras.main.on('camerafadeoutcomplete', function(camera, effect){
  
        this.scene.restart();
        return;
      }, this);
  
  
  
    }
  };




};

// set configuration of game
let config = {
  type: Phaser.AUTO, // will use WebGL if available otherwise it will use Canvas 
  width: 640,
  height: 360,
  scene: gameScene
};
// create a new game, pass the configuration
let game = new Phaser.Game(config);



//   if (this.dragonGoDown == true) {
//     this.dragon.y += this.dragonSpeed;
//   }
//   else {
//     this.dragon.y -= this.dragonSpeed;
//   }

//   // change direction down
//   if (this.dragon.y <= this.dragonTopBound && this.dragonGoDown == false) {
//     this.dragonGoDown = true
//     console.log("going up")
//   }
//   // change direction up
//   if (this.dragon.y >= this.dragonBottomBound && this.dragonGoDown == true) {
//     this.dragonGoDown = false
//     console.log("going down")
//   }
