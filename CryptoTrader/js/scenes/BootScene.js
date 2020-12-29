class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }

  preload() {
    // load images
    this.loadImages();
    // load spritesheet
    this.loadSpriteSheets();
    // you can provide multiple audio clips for this sound depending on whether or not they support the type
    this.loadAudio();

  }

  loadImages() {
    this.load.image('button1', 'assets/images/ui/blue_button01.png');
    this.load.image('button2', 'assets/images/ui/blue_button02.png');
    this.load.image('btc', 'assets/images/btc.png');
    this.load.image('wojak', 'assets/images/wojak.png');
    this.load.image('pointref', 'assets/images/pointref.png');
  }
  loadSpriteSheets() {

    this.load.spritesheet('items', 'assets/images/items.png',{frameWidth: 32, frameHeight: 32});
    this.load.spritesheet('characters', 'assets/images/characters.png',{frameWidth: 32, frameHeight: 32});
  }
  loadAudio() {
    this.load.audio('goldAudio', ['assets/audio/Pickup.wav'])
    this.load.audio('wojakAudio', ['assets/audio/wojak.mp3'])
  }
  create() {
    console.log('Loading Game');
    this.scene.start('Title')
  }
}