class Potion extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key) { //Future idea could be to add a healing parameter or have different categories of potions
        super(scene, x, y, key);

        this.scene = scene;
    
        this.healing = 10; //Amount of health item gives

        //Enable physics
        scene.physics.world.enable(this);
        //Add to scene
        scene.add.existing(this);

        this.setScale(1.0/8);

    }
}