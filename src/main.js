var config = {
    type: Phaser.AUTO,
    scale: {
        parent: 'game',
        mode: Phaser.Scale.FIT,
        width: 800,
        height: 600,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    autoRound: false,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: 0,
            debug: false
        }
    },
    scene: [Game]
};


var game = new Phaser.Game(config);
