class Enemy extends Entity
{
    constructor(scene, info, sprite_key)
    {
        super(scene, info, sprite_key);
        this.body.setCollideWorldBounds(true);
        this.scene = scene;
    };
    update()
    {
        if (this.info.health <= 0)
        {
            this.scene.events.emit('deadEnemy', this.info, this.scene);
        }
        this.info.x = this.body.x;
        this.info.y = this.body.y;
        super.update();

    }   
}