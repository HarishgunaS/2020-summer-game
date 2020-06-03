class HUD 
{
    constructor(scene, player)
    {
        this.player = player;
        this.health = scene.add.text(50,50,'Health: ' + this.player.info.health + ' Mana: ' + this.player.info.mana + ' Potions: ' + this.player.info.potionCount);
        this.health.setScrollFactor(0);
        this.coordinates = scene.add.text(550, 50, 'Coordinates: ' + Math.round(this.player.x) + ", " + Math.round(this.player.y));
        this.coordinates.setScrollFactor(0);
    }
    update()
    {
        this.health.setText('Health: ' + this.player.info.health + ' Mana: ' + this.player.info.mana + ' Potions: ' + this.player.info.potionCount); //Can find better place for potion counter but I'm lazy and it'll be changed later anyways
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

        //Hassam Code, why not have a BootScene to preload assets and reduce clutter once more assets are used?
        this.load.image('potion', 'assets/dontSueMeHP.png') //Preferably will be changed to something not copyrighted, also another option could be to make a spritesheet of items

    }
    create ()
    {

        this.clock = false;
        this.enemyCount = 1;
        this.enemyClk = this.time.addEvent({delay: 1000, callback: function()
        {
            this.clock = true;
            this.enemies.getChildren().forEach(function(enemy)
            {
                let direction = Phaser.Math.Between(0,3);
                if(direction == 0)
                {
                    enemy.body.setVelocityX(enemy.info.speed);
                    enemy.body.setVelocityY(0);
                }
                else if(direction == 1)
                {
                    enemy.body.setVelocityX(-1*enemy.info.speed);
                    enemy.body.setVelocityY(0);
                }
                else if(direction == 2)
                {
                    enemy.body.setVelocityY(enemy.info.speed);
                    enemy.body.setVelocityX(0);
                }
                else
                {
                    enemy.body.setVelocityY(-1*enemy.info.speed);
                    enemy.body.setVelocityX(0);
                }


            }, this);
        }, callbackScope: this, loop:true});
        this.anims.create({
            key: 'goblin_walk',
            frames: this.anims.generateFrameNumbers('goblin', {start: 0, end: 10}),
            frameRate: 10,
            repeat: -1
        });
        this.map = this.add.tileSprite(game.config.width/2, game.config.height/2, 2*game.config.width,2*game.config.height,'grass')
              
        this.enemies = this.physics.add.group();
        
        for (var i = 0; i < 10; i++)
        {
            var info = {id:1+i, x:Phaser.Math.Between(-350, 1150), y:Phaser.Math.Between(-250, 850), speed: 50, attack:10, health: 50, mana:30, maxMana:30, attackedBy:null};
            this.enemies.add(new Enemy(this, info, 'goblin'));
        }


        this.enemies.runChildUpdate = true;
        
        this.player_info = {id:0, x:game.config.width/2, y:game.config.height/2, speed:150, current_speed:150, health:100, maxHealth:100, attack: 20, mana:20, maxMana:20, attackedBy:null, potionCount:0};
        this.player = new Player(this, this.player_info, 'player');
        this.physics.add.overlap(this.player, this.enemies, function (p, e)
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

        this.events.on('deadGoblin', function(info) { //Code doesn't work
            this.potion = new Potion(this, info.x, info.y, 'potion');
            console.log("working");
        });

        //More trashy Hassam code
        //this.potion = new Potion(this, 100, 100, 'potion'); //Spawn system can be enhanced
        this.physics.add.overlap(this.player, this.potion, function(){ //Could add some logic to make it up only if a key is pressed
            this.player.info.potionCount++;
            //this.player.info.health += this.potion.healing; //Could add a cap to how much can be healed
            this.potion.destroy(); //can make something more efficient
        },null,this);

        this.cursors = this.input.keyboard.addKeys(
            {up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D,
            use:Phaser.Input.Keyboard.KeyCodes.U, //U to use a potion, can remap to something else later
            space:Phaser.Input.Keyboard.KeyCodes.SPACE});
        this.hud = new HUD(this, this.player);
        this.physics.world.setBounds(game.config.width/(-2) , game.config.height/-2, game.config.width*2,game.config.height*2);
    }

    update ()
    {
        this.clock = false;
        this.player.update(this.cursors);
        this.hud.update();
    }

    
}