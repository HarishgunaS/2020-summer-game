class Entity extends Phaser.GameObjects.Sprite
{
    /*
    info contains:
    speed, current_speed, id, health, attack, attackedBy, x, y, mana, 
    */
    constructor(scene, info, sprite_key)
    {
        super(scene, info.x, info.y, sprite_key)
        this.info = info;
        scene.add.existing(this);
        scene.physics.world.enable(this);      
        this.body.setCollideWorldBounds(true);

    };
    getHealth()
    {
        return this.health;
    }
    update()
    {
        if(this.info.mana < this.info.maxMana)
        {
            this.info.mana += 1;
        }
        if(this.info.health <= 0)
        {
           // this.events.emit('deadGoblin', this.info); //Sends an event that says that a goblin has been killed, so spawn a potion/gain exp or whatever is desired
            console.log("kill");
            
            this.destroy();
            return;
        }
    }
    attack(e)
    {
        /*if (this.info.mana >= this.info.maxMana)
        {
            
            this.info.mana = 0;
        }*/
        e.info.attackedBy = this.info.id;
        e.info.health -= this.info.attack;
        
    }
};