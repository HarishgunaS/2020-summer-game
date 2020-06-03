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
        super.update();
        if(this.info.health <= 0)
        {
            return;
        }

        //Movement logic
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

        //Potion or rudementary item use logic
        if(Phaser.Input.Keyboard.JustDown(cursors.use) && this.info.potionCount > 0)
        {
            this.info.potionCount--;
            this.info.health += 10;//Arbitrary number for now, can be updated to account for different potion types or become percentage
            //I'm gonna assume that the game fixes health already if it is above the cap, otherwise one can add that logic here as well

        }
    }
}