class Downstairs extends Phaser.Scene{
    constructor(){
        super('downstairsScene')
        this.VEL = 100
        //assets temporary from tilemapping
        //need to add sound before turn in
        //ned to make the scene work
        
    }
    preload(){
        this.load.path = './assets/'
        this.load.image('star', 'star3.png')
        this.load.spritesheet('slime', 'slime.png', { frameWidth: 16,    frameHeight: 16 })
        this.load.spritesheet('char', 'free_character_1-3.png', { frameWidth: 16,    frameHeight: 20 })
        this.load.image('tilesetImage', 'atlas_32x.png')
        this.load.tilemapTiledJSON('tilemapJSON2', 'kitchen.json')
        this.load.image('star', 'assets/demoscene/star3.png');
        this.load.audio('beep', 'beep.wav')

}

    create(data){
        //console.log("Owo")
        const map = this.make.tilemap({key:'tilemapJSON2'})
        const tileset = map.addTilesetImage('atlas_32x', 'tilesetImage')
        const FloorLayer = map.createLayer('Floor', tileset)
        const WallLayer = map.createLayer('Wall', tileset)
        const WindowLayer = map.createLayer('Window', tileset)
        const SofaLayer = map.createLayer('Sofa', tileset)
        const MugLayer = map.createLayer('Mug', tileset)
        this.z=0
        this.music=this.sound.add('beep',{
            volume:0.2,
            loop:false
          })
        this.x=0
        this.y=0

        const slimeSpawn = map.findObject('Spawns', obj => obj.name === 'PlayerSpawn')
        this.slime = this.physics.add.sprite(slimeSpawn.x, slimeSpawn.y,'char', 0)
/*this.anims.create({
    key: 'jiggle',
    frameRate: 8,
    repeat: -1,
    frames: this.anims.generateFrameNumbers('slime',{start: 0,end: 1})
})
this.slime.play('jiggle')*/
this.slime.body.setCollideWorldBounds(true)
    this.knife=data.knife;
    this.key=data.key;
    this.mug=data.mug;
    this.inventory=data.inventory;

this.cursors = this.input.keyboard.createCursorKeys()
//this.inventory="Inventory:"
this.cameras.main.setBounds(0, 0, map.widthInPixels,map.heightInPixels)
this.cameras.main.startFollow(this.slime, true, 0.25, 0.25)
this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels)
WallLayer.setCollisionByProperty({Collides: true})
this.physics.add.collider(this.slime, WallLayer)
FloorLayer.setCollisionByProperty({Collides: true})
this.physics.add.collider(this.slime, FloorLayer)
WindowLayer.setCollisionByProperty({Collides: true})
this.physics.add.collider(this.slime, WindowLayer)
SofaLayer.setCollisionByProperty({Collides: true})
this.physics.add.collider(this.slime, SofaLayer)
MugLayer.setCollisionByProperty({Collides: true})
this.physics.add.collider(this.slime, MugLayer)
this.inventoryText = this.add.text(30, 30, this.inventory, {
    fontSize: '14px',
    fill: '#ffffff'
});

this.x=3000
for(this.i=0;this.i<100000;this.i++){
    this.clock = this.time.delayedCall(this.x, () => {
        this.q = this.physics.add.sprite(this.slime.x, this.slime.y, 'char', 0)
        this.q.setVelocity(0,0)
        this.slime.x=Phaser.Math.Between(40, 280)
        this.slime.y=Phaser.Math.Between(168, 239)
        this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
			this.music.play()
		})
        
      }, null, this);
      this.x+=3000
}

}



update(){

    this.z+=1
    //console.log(this.z)
    if(this.z==30000){
        this.add.particles(90, 120, 'star', {
            speed: 100,
            lifespan: 100,
            gravityY: 1000,
            scaleX: 0.3,
            scaleY: 0.3
        });
        
    }

this.direction=new Phaser.Math.Vector2(0)

if(this.cursors.left.isDown){
    this.direction.x=-1
    this.x-=1

} else if(this.cursors.right.isDown){
    this.direction.x+=1
    this.x+=1
}
if(this.cursors.up.isDown){
    this.direction.y=-1
    this.y-=1
} else if(this.cursors.down.isDown){
    this.direction.y+=1
    this.y+=1
}


if(this.cursors.space.isDown){
    //console.log("x")
//console.log(this.slime.x)
//console.log("y")
//console.log(this.slime.y)
if((this.slime.x>=72&&this.slime.x<=112)&&(this.slime.y<=150&&this.slime.y>=120)){
    //console.log("in range")
    if(this.knife==false){
        this.inventory+='\nKnife'
        this.inventoryText.setText(this.inventory)
        this.knife=true
    }
    
}else if((this.slime.x>=230&&this.slime.x<=250)&&(this.slime.y<=120&&this.slime.y>=106)){
    //console.log("in range")
    if(this.key==1){
        //
        //console.log("Go upstairs")
        this.scene.stop('downstairsScene')
        this.scene.start('Overworld', { inventory: this.inventory, mug: this.mug, key: this.key, knife: this.knife})
    }
    
}
}

//

if(this.fire==1&&this.knife==1){
    this.scene.start("menuScene");
}
//console.log("DOWNSTAIRS")
this.direction.normalize()
this.slime.setVelocity(this.VEL*this.direction.x,this.VEL*this.direction.y)

}






}