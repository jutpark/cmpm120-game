class Overworld extends Phaser.Scene{
    constructor(){
        super({key: 'overworldScene'})
        this.VEL = 100
        //assets temporary from tilemapping
        //need to add sound before turn in
        //ned to make the scene work
        
    }
    preload(){
        this.load.path = './assets/'
        this.load.spritesheet('slime', 'slime.png', { frameWidth: 16,    frameHeight: 16 })
        this.load.image('tilesetImage', 'tileset.png')
        this.load.tilemapTiledJSON('tilemapJSON', 'area01.json')

}

    create(){
        console.log("Owo")
        const map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage('tileset', 'tilesetImage')
        const bgLayer = map.createLayer('Background', tileset, 0, 0)
        const terrainLayer = map.createLayer('Terrain', tileset, 0, 0)
        const treeLayer = map.createLayer('Trees', tileset, 0, 0)
        this.x=0
        this.y=0

        const slimeSpawn = map.findObject('Spawns', obj => obj.name === 'slimeSpawn')
        this.slime = this.physics.add.sprite(slimeSpawn.x, slimeSpawn.y,'slime', 0)
this.anims.create({
    key: 'jiggle',
    frameRate: 8,
    repeat: -1,
    frames: this.anims.generateFrameNumbers('slime',{start: 0,end: 1})
})
this.slime.play('jiggle')
this.slime.body.setCollideWorldBounds(true)
this.fire=false;
this.knife=false;
this.cursors = this.input.keyboard.createCursorKeys()
this.inventory="Inventory:"
this.cameras.main.setBounds(0, 0, map.widthInPixels,map.heightInPixels)
this.cameras.main.startFollow(this.slime, true, 0.25, 0.25)
this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels)
terrainLayer.setCollisionByProperty({collides: true})
this.physics.add.collider(this.slime, terrainLayer)
this.inventoryText = this.add.text(30, 30, this.inventory, {
    fontSize: '14px',
    fill: '#ffffff'
});

this.x=3000
for(this.i=0;this.i<100000;this.i++){
    this.clock = this.time.delayedCall(this.x, () => {
        this.q = this.physics.add.sprite(this.slime.x, this.slime.y, 'slime', 0)
        this.q.setVelocity(0,0)
        this.slime.x=Phaser.Math.Between(100, 400)
        this.slime.y=Phaser.Math.Between(100, 400)
      }, null, this);
      this.x+=3000
}

}

update(){


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
    console.log("x")
console.log(this.slime.x)
if((this.slime.x>=260&&this.slime.x<=300)&&(this.slime.y<=312&&this.slime.y>=264)){
    console.log("in range")
    if(this.knife!=1){
        this.inventory+='\nknife'
        this.inventoryText.setText(this.inventory)
        this.knife=1
    }
    
}else if((this.slime.x>=152&&this.slime.x<=184)&&(this.slime.y<=312&&this.slime.y>=280)){
    console.log("in range")
    if(this.fire!=1){
        this.inventory+='\nfire'
        this.inventoryText.setText(this.inventory)
        this.fire=1
    }
    
}
}

//

if(this.fire==1&&this.knife==1){
    this.scene.start("menuScene");
}
this.direction.normalize()
this.slime.setVelocity(this.VEL*this.direction.x,this.VEL*this.direction.y)

}






}