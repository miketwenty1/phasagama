// tween.onComplete.add(function() {}) NEED TO LOOK INTO THIS
// create a new scene named "Game"
let gameScene = new Phaser.Scene('Game');

// some parameters for our scene
gameScene.init = function() {
  // word db equivalent
  this.words = 
  [
    {
      key: 'building',
      setXY: {
        x: 100,
        y: 240
      },
      setScale: {
        x: 0.8,
        y: 0.8
      },
      spanish: 'edificio'
    },
    {
      key: 'house',
      setXY: {
        x: 250,
        y: 280
      },
      setScale: {
        x: 0.8,
        y: 0.8
      },
      spanish: 'casa'
    },
    {
      key: 'tree',
      setXY: {
        x: 400,
        y: 265
      },
      setScale: {
        x: 0.8,
        y: 0.8
      },
      spanish: 'árbol'
    },
    {
      key: 'car',
      setXY: {
        x: 550,
        y: 290
      },
      setScale: {
        x: 0.8,
        y: 0.8
      },
      spanish: 'automóvil'
      //,
      // setAlpha: {
      //   value: .5
      // }
    }
  ]


}

// load asset files for our game
gameScene.preload = function() {
  this.load.image('background', 'assets/images/background-city.png');
  this.load.image('building', 'assets/images/building.png');
  this.load.image('car', 'assets/images/car.png');
  this.load.image('house', 'assets/images/house.png');
  this.load.image('tree', 'assets/images/tree.png');

  this.load.audio('correctAudio', 'assets/audio/correct.mp3');
  this.load.audio('wrongAudio', 'assets/audio/wrong.mp3');
  this.load.audio('buildingAudio', 'assets/audio/edificio.mp3');
  this.load.audio('carAudio', 'assets/audio/auto.mp3');
  this.load.audio('houseAudio', 'assets/audio/casa.mp3');
  this.load.audio('treeAudio', 'assets/audio/arbol.mp3');
};

// executed once, after assets were loaded
gameScene.create = function() {
  this.correctSound = this.sound.add('correctAudio');
  this.wrongSound = this.sound.add('wrongAudio');

  this.items = this.add.group(this.words);
  // console.log(this.items);
  this.items.setDepth(1);
  let bg = this.add.sprite(0,0, 'background').setOrigin(0,0);

  let items = this.items.getChildren();
  // console.log(items.length);
  // Phaser.Actions.Call(this.items.getChildren(), function(item){
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    this.words[i].sound = this.sound.add(item.texture.key + 'Audio');
    // console.log(item.texture.key);
    item.setInteractive();
    item.setAlpha(.75);
    // item.setScale(.8); // showing different ways to set scale for the group
    // tweening resize
    // item.resizeTween = this.tweens.add({
    //   targets: item,
    //   scaleX: 1.5,
    //   scaleY: 1.5,
    //   duration: 200,
    //   paused: true,
    //   yoyo: true,
    //   ease: 'Circ.easeOut'
    // });
    item.alphaTween = this.tweens.add({
      targets: item,
      alpha: 1,
      scaleX: .85,
      scaleY: .85,
      duration: 50,
      paused: true,
    });
    item.correctTween = this.tweens.add({
      targets: item,
      scaleX: 1.5,
      scaleY: 1.5,
      duration: 200,
      paused: true,
      yoyo: true,
      ease: 'Circ.easeOut'
    });
    item.wrongTween = this.tweens.add({
      targets: item,
      scaleX: .75,
      scaleY: .75,
      duration: 200,
      angle: 90,
      paused: true,
      yoyo: true,
      ease: 'Circ.easeOut'
    });

    item.on('pointerdown', function(pointer){
      // console.log('you clicked ' + item.texture.key);
      // item.resizeTween.restart();
      let result = this.processAnswer(this.words[i].spanish);
      if (result) {
        item.correctTween.restart();
        // needs better logic for onComplete of the tween 
        // item.wrongTween.stop();
      } else {
        item.wrongTween.restart();
        // needs better logic for onComplete of the tween 
        item.correctTween.stop();
      }
      this.showNextQuestion();
    }, this);
    item.on('pointerover', function(pointer){
      // console.log('you hovered over' + item.texture.key);
      item.alphaTween.restart();
      // item.correctTween.stop();
      // item.wrongTween.stop();
    });
    item.on('pointerout', function(pointer){
      // console.log('you hovered off of' + item.texture.key);
      // stop tween or the hoveroff action won't work
      // item.alphaTween.stop();
      // item.correctTween.stop();
      // item.wrongTween.stop();


      item.alpha = .75;
      item.angle = 0;
      item.setScale(.8);

    });
  }
  this.wordText = this.add.text(30,20, ' ', {
    fontSize: '40px',
    fill: '#ffffff'
  });
  // show first question
  this.showNextQuestion();

  // soundSample.play();
  // soundSample.pause();
  // soundSample.resume();
  // soundSample.stop();
};

// show new question
gameScene.showNextQuestion = function(){
  // show a random word
  this.nextWord = Phaser.Math.RND.pick(this.words);
  // play sound for word
  // console.log(tthisnextWord);
  // let soundSample = this.sound.add('correctAudio');
  this.nextWord.sound.play();
  this.wordText.setText(this.nextWord.spanish);
  // show text of word in spanish
};

// check answer
gameScene.processAnswer = function(userResponse){
  if (userResponse == this.nextWord.spanish) {
    this.correctSound.play();
    return true;
  } else {
    this.wrongSound.play();
    return false;
  }

};

// our game's configuration
let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  scene: gameScene,
  title: 'Audio Game',
  // false to use antialias (blending)
  pixelArt: false,
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);

