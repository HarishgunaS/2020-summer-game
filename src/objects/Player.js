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