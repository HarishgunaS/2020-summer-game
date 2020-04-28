class HUD 
{
    constructor(scene, player)
    {
        this.player = player;
        this.health = scene.add.text(50,50,'Health: ' + this.player.getHealth());
        this.health.setScrollFactor(0);
        this.coordinates = scene.add.text(550, 50, 'Coordinates: ' + Math.round(this.player.getSprite().x) + ", " + Math.round(this.player.getSprite().y));
        this.coordinates.setScrollFactor(0);
    }
    update()
    {
        this.health.setText('Health: ' + this.player.getHealth());
        this.coordinates.setText('Coordinates: ' + Math.round(this.player.getSprite().x) + ", " + Math.round(this.player.getSprite().y));
    }
}
class Player 
{
    constructor(scene, data, sprite_key)
    {
        this.speed = data.speed;
        this.health = data.health;
        this.sprite = scene.physics.add.sprite(data.x, data.y, sprite_key);
        this.sprite.setCollideWorldBounds(true);
        scene.cameras.main.startFollow(this.sprite);
    }
    update(cursors)
    {
        if (cursors.down.isDown)
        {
            this.sprite.setVelocityY(this.speed);
        }
        else if (cursors.up.isDown)
        {
            this.sprite.setVelocityY(-this.speed);
        }
        else
        {
            this.sprite.setVelocityY(0);
        }

        if (cursors.right.isDown)
        {
            this.sprite.setVelocityX(this.speed);
        }
        else if (cursors.left.isDown)
        {
            this.sprite.setVelocityX(-this.speed);
        }
        else
        {
            this.sprite.setVelocityX(0);
        }
    }
    getSprite()
    {
        return this.sprite;
    }
    getHealth()
    {
        return this.health;
    }
}
class Game extends Phaser.Scene
{
    
    constructor()
    {
        super("playGame");
    }
    preload ()
    {
        this.load.image('player', 'assets/sprite1.png');
        this.load.image('grass', 'assets/grass.png');
        this.load.spritesheet('goblin', 'assets/goblin.png',{
            frameWidth: 64, frameHeight: 64
        });
    }
    create ()
    {
        console.log("here");
        this.anims.create({
            key: 'goblin_walk',
            frames: this.anims.generateFrameNumbers('goblin', {start: 0, end: 10}),
            frameRate: 10,
            repeat: -1
        });
        this.add.text(20,20,"playing game");
        this.map = this.add.tileSprite(game.config.width/2, game.config.height/2, 2*game.config.width,2*game.config.height,'grass')
        this.enemy = this.add.sprite(50, 50, 'goblin');
        this.enemy.play('goblin_walk');
        this.player_data = {x:game.config.width/2, y:game.config.height/2, speed:150, health:100}
        this.player = new Player(this, this.player_data, 'player');
        this.cursors = this.input.keyboard.createCursorKeys();
        this.hud = new HUD(this, this.player);
        this.physics.world.setBounds(game.config.width/(-2) , game.config.height/-2, game.config.width*2,game.config.height*2);
    }
    update ()
    {
        this.player.update(this.cursors);
        this.hud.update();
    }
}