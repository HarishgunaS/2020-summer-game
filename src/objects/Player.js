class Player extends Entity
{
    constructor(scene, info, sprite_key)
    {
        super(scene, info, sprite_key);
        this.scene = scene;
        scene.cameras.main.startFollow(this);
    };
    update(cursors)
    {
        super.update(this.info);
        if (cursors.space.isDown)
        {
            this.info.mana = 0;
        }
        if(this.info.health <= 0)
        {
            return;
        }
        if ((cursors.down.isDown || cursors.up.isDown) && (cursors.left.isDown || cursors.right.isDown))
        {
            this.info.current_speed = this.info.speed/(Math.sqrt(2));
        }
        else
        {
            this.info.current_speed = this.info.speed;
        };
        if (cursors.down.isDown)
        {
            this.body.setVelocityY(this.info.current_speed);
        }
        else if (cursors.up.isDown)
        {
            this.body.setVelocityY(-this.info.current_speed);
        }
        else
        {
            this.body.setVelocityY(0);
        };

        if (cursors.right.isDown)
        {
            this.body.setVelocityX(this.info.current_speed);
        }
        else if (cursors.left.isDown)
        {
            this.body.setVelocityX(-this.info.current_speed);
        }
        else
        {
            this.body.setVelocityX(0);
        }
    }
}