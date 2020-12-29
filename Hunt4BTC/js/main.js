let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [
    // order matters
    BootScene,
    TitleScene,
    GameScene,
    UiScene
  ],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: {
        y: 0 
      }
    }
  }
};

let game = new Phaser.Game(config);
