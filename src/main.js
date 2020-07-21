
var config = {
    type: Phaser.AUTO,
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio,
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
