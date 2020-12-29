class TitleScene extends Phaser.Scene {
  constructor () {
    super('Title');
  }

  create() {
    this.titleText = this.add.text(this.scale.width/2, this.scale.height/2, 'Crypto Trader', {
      fontSize: '64px',
      fill: '#6f6f6f'
    });
    this.titleText.setOrigin(.5);
    this.startGameButton = new UiButton(
      this,
      this.scale.width / 2,
      this.scale.height * 0.65,
      'button1',
      'button2',
      'Start the Hunt',
      this.startScene.bind(this, 'Game')
    );
  }
  startScene(targetScene) {
    this.scene.start(targetScene);
  }
  
}