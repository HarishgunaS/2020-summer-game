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
        super.update();
    }   
}