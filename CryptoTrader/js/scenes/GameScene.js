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
    this.hurryDepositPhrase = 'I have some Bitcoins\nI\'ll hurry to trade them \nAt the Exchange!';
    this.hurryDepositText = this.add.text(300,20, this.hurryDepositPhrase, { fontSize: '20px', fill: '#ff00ff' });

    this.depositPhrase = 'I have Bitcoins,\nnow to trade them \nat the exchange';
    this.phrases = [
      'This YouTube \ninfluencer lied to me',
      'I misread the charts',
      'Should of stuck \nwith Theta strategy',
      'Damn, Margin Called',
    ]
    this.ref = this.add.image(this.input.activePointer.downX,this.input.activePointer.downY,'pointref').setAlpha(0.4).setVisible(false);
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
    this.ref.setX(this.input.activePointer.downX);
    this.ref.setY(this.input.activePointer.downY);
    this.ref.setVisible(true);

    if (this.input.activePointer.isDown == false) {
      this.ref.setVisible(false);
    }
    if (this.score > 10) {
      this.hurryDepositText.setVisible(true);
    } else {
      this.hurryDepositText.setVisible(false);
    }
    this.player.update(this.cursors, this.input.activePointer, this.player.body.x, this.player.body.y);
    if ((this.player.body.touching.down || this.player.body.touching.right) && this.score > 0 && this.player.body.x > 250 && this.player.body.y > 250)
    {
      this.add.text(100+this.depositCount*20, 100+this.depositCount*100, this.words[this.depositCount], { fontSize: '30px', fill: '#fff' });
      console.log(this.words[this.depositCount]);
      this.depositCount += 1;
      console.log(this.depositCount);
      let currentPhrase = this.add.text(300,200, this.phrases[this.depositCount], { fontSize: '25px', fill: '#ffff00' });

      setTimeout(() => { 
        currentPhrase.destroy();
      }, 1500);

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
      setTimeout(() => { wojakImage.destroy(); this.scene.restart(); this.scene.start('Title');}, 1000);
      
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
    this.player = new Player(this, 32, 402, 'characters', 5);
  }
  createChests() {
    this.chestPositions = [
      [100,40],
      [160,50],
      [50,200],
      [100,100],
      [200,200],
      [60,60],
      [200,100]
    ]
    this.chests = this.physics.add.group();
    this.maxNumberOfChest = 3;
    for (let i = 0; i < this.maxNumberOfChest; i++) {
      this.spawnChest();
    }
  }
  spawnChest() {
    const location = this.chestPositions[Math.floor(Math.random() * this.chestPositions.length)];
    // console.log(location);
    let chest = this.chests.getFirstDead();
    if (!chest) {
      console.log('create new chest');
      const chest = new Chest (this, location[0],location[1], 'items',3);
      this.chests.add(chest);
    } else {
      console.log('reposition dead chest');
      chest.setPosition(location[0], location[1]);
      chest.makeActive();
    }

  }
  createWalls() {
    this.wall = this.physics.add.image(500, 400, 'button1').setScale(1.2,2);
    this.wall.body.setAllowGravity(false);
    this.wall.setImmovable();

    this.exchangeText = this.add.text(0, 0, 'Shitcoin \nExchange', { fontSize: '35px', fill: '#fff' });
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