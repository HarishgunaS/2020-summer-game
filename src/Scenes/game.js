class HUD 
{
    constructor(scene, player)
    {
        this.player = player;
        this.health = scene.add.text(50,50,'Health: ' + this.player.info.health + ' Mana: ' + this.player.info.mana);
        this.health.setScrollFactor(0);
        this.coordinates = scene.add.text(550, 50, 'Coordinates: ' + Math.round(this.player.x) + ", " + Math.round(this.player.y));
        this.coordinates.setScrollFactor(0);
    }
    update()
    {
        this.health.setText('Health: ' + this.player.info.health + ' Mana: ' + this.player.info.mana);
        this.coordinates.setText('Coordinates: ' + Math.round(this.player.x) + ", " + Math.round(this.player.y));
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
        this.clock = false;
        this.enemyCount = 1;
        this.enemyClk = this.time.addEvent({delay: 1000, callback: function()
            {
                this.clock = true;
            }, callbackScope: this, loop:true})
        this.anims.create({
            key: 'goblin_walk',
            frames: this.anims.generateFrameNumbers('goblin', {start: 0, end: 10}),
            frameRate: 10,
            repeat: -1
        });
        this.add.text(20,20,"playing game");
        this.map = this.add.tileSprite(game.config.width/2, game.config.height/2, 2*game.config.width,2*game.config.height,'grass')
        
        
        
        this.enemy_info = {id:1, x:50, y:50, attack:10, health: 50, mana:30, maxMana:30};
        this.enemy = new Enemy(this, this.enemy_info, 'goblin');
        
        enemies = this.physics.add.group();
        
        this.player_info = {id:0, x:game.config.width/2, y:game.config.height/2, speed:150, current_speed:150, health:100, maxHealth:100, attack: 20, mana:20, maxMana:20}
        this.player = new Player(this, this.player_info, 'player');
        this.physics.add.overlap(this.player, this.enemy, function (p, e)
        {
            if (Phaser.Input.Keyboard.JustDown(this.cursors.space))
            {
                p.attack(e);
            }
            if(this.clock)
            {
                e.attack(p);
            }
        }, 
        null,
        this);

        this.cursors = this.input.keyboard.addKeys(
            {up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D,
            space:Phaser.Input.Keyboard.KeyCodes.SPACE});
        this.hud = new HUD(this, this.player);
        this.physics.world.setBounds(game.config.width/(-2) , game.config.height/-2, game.config.width*2,game.config.height*2);
    }
    update ()
    {
        this.clock = false;
        this.player.update(this.cursors);
        this.enemy.update(this.enemy.info);
        this.hud.update();
    }
}
