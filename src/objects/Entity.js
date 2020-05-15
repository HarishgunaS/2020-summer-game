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
    update(info)
    {
        if(info.mana < info.maxMana)
        {
            info.mana += 1;
        }
        if(info.health <= 0)
        {
            this.destroy();
            return;
        }
        console.log("ID: " + this.info.id + ", mana: " + this.info.mana);
    }
    attack(e)
    {
        if (this.info.mana >= this.info.maxMana)
        {
            e.info.attackedBy = this.info.id;
            e.info.health -= this.info.attack;
            this.info.mana = 0;
        }
        
    }
};