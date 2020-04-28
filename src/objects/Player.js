class Player 
{
    constructor(scene, data, sprite_key)
    {
        this.speed = data.speed;
        this.current_speed = this.speed;
        this.health = data.health;
        this.sprite = scene.physics.add.sprite(data.x, data.y, sprite_key);
        this.sprite.setCollideWorldBounds(true);
        scene.cameras.main.startFollow(this.sprite);
    }
    update(cursors)
    {
        if ((cursors.down.isDown || cursors.up.isDown) && (cursors.left.isDown || cursors.right.isDown))
        {
            this.current_speed = this.speed/(Math.sqrt(2));
        }
        else
        {
            this.current_speed = this.speed;
        }
        if (cursors.down.isDown)
        {
            this.sprite.setVelocityY(this.current_speed);
        }
        else if (cursors.up.isDown)
        {
            this.sprite.setVelocityY(-this.current_speed);
        }
        else
        {
            this.sprite.setVelocityY(0);
        }

        if (cursors.right.isDown)
        {
            this.sprite.setVelocityX(this.current_speed);
        }
        else if (cursors.left.isDown)
        {
            this.sprite.setVelocityX(-this.current_speed);
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