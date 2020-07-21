
var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE,
        parent: null,
        width: '80%',
        height: '80%'
    },
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
