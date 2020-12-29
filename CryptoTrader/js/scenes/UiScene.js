class UiScene extends Phaser.Scene {
  constructor () {
    super('Ui');
  }
  init() {
    this.gameScene = this.scene.get('Game');
  }
  create() {
    this.setupUiElements();
    this.setupEvents();
  }
  setupUiElements() {
    this.scoreText = this.add.text(60, 18, 'Bitcoins: 0', {
      fontSize: '20px',
      fill: '#ffffff'
    });
    this.btcIcon = this.add.image(26,24,'btc').setScale(.8);
  }
  setupEvents() {
    // listen for updateScore event from game scene
    this.gameScene.events.on('updateScore', (score => {
      this.scoreText.setText(`Bitcoins: ${score}`);
    }))
  }
}