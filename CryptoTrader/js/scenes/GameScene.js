class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }
  init() {
    this.scene.launch('Ui');
    this.score = 0;
    this.depositCount = 0; 
    this.words = [
      'Have',
      'Fun',
      'Staying',
      'Poor'
    ]
  }
  create() {
    this.createAudio();
    this.createInput();
    this.createPlayer();
    this.createChests();
    this.createWalls();
    this.addCollisions();
  
  }

  update () {
    this.player.update(this.cursors, this.input.activePointer, this.player.body.x, this.player.body.y);
    if (this.player.body.touching.down && this.score > 0 && this.player.body.x >300 && this.player.body.y > 300)
    {
      this.add.text(100+this.depositCount*20, 100+this.depositCount*100, this.words[this.depositCount], { fontSize: '30px', fill: '#fff' });
      console.log(this.words[this.depositCount]);
      this.depositCount += 1;
      console.log(this.depositCount);
      console.log('thanks for deposit '+ this.depositCount);
      this.score = 0;
      this.events.emit('updateScore', this.score);
      console.log('touching');
      
    }
    if (this.depositCount == 4) {
      console.log("wojak");
      this.depositCount = 0;
      let wojakImage = this.add.image(200,200, 'wojak').setOrigin(0,0);
      this.wojakSad.play();
      setTimeout(() => { wojakImage.destroy(); this.scene.restart(); }, 1000);
      
    }
  }

  createAudio() {
    this.goldPickup = this.sound.add('goldAudio', {
      loop: false,
      volume: .6 // value between 0 and 1
    });
    this.wojakSad = this.sound.add('wojakAudio', {
      loop: false,
      volume: .07 // value between 0 and 1
    });
  }
  createPlayer() {
    this.player = new Player(this, 32, 32, 'characters', 5);
  }
  createChests() {
    this.chessPositions = [
      [500,40],
      [200,50],
      [50,200],
      [100,100],
      [200,200],
      [500,300],
      [200,100]
    ]
    this.chests = this.physics.add.group();
    this.maxNumberOfChest = 3;
    for (let i = 0; i < this.maxNumberOfChest; i++) {
      this.spawnChest();
    }
  }
  spawnChest() {
    const location = this.chessPositions[Math.floor(Math.random() * this.chessPositions.length)]
    // console.log(location);
    let chest = this.chests.getFirstDead();
    if (!chest) {
      console.log('create new chest');
      const chest = new Chest (this, location[0],location[1], 'items',0);
      this.chests.add(chest);
    } else {
      console.log('reposition dead chest');
      chest.setPosition(location[0], location[1]);
      chest.makeActive();
    }

  }
  createWalls() {
    this.wall = this.physics.add.image(500, 500, 'button1');
    this.wall.body.setAllowGravity(false);
    this.wall.setImmovable();

    this.exchangeText = this.add.text(0, 0, 'Shitcoin Exchange', { fontSize: '15px', fill: '#fff' });
    Phaser.Display.Align.In.Center(this.exchangeText, this.wall);

  }
  createInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  addCollisions() {
    this.physics.add.collider(this.player, this.wall);
    this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this);
  }

  collectChest(player,chest) {
    // console.log('collected chest');
    chest.makeInactive();
    this.score += chest.coins
    this.events.emit('updateScore', this.score);
    if (this.goldPickup.isPlaying == false) {
      this.goldPickup.play();
    }
    this.time.delayedCall(1000, this.spawnChest, [], this);
  }

}