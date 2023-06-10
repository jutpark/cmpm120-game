
let config={
    type: Phaser.CANVAS,
    render: {
        pixelArt:true
    },
    width: 320,
    height:320,
    physics:{
        default: "arcade",
        arcade:{
            debug:true
        }
    },
    zoom: 2,
    scene: [Menu,Overworld,Downstairs]
}
const game = new Phaser.Game(config)

let borderUISize=game.config.height/15;
let borderPadding=borderUISize/3;
let mouse,keyF,keyR,keyLEFT,keyRIGHT;
/*
5 components
timer(to teleport around)
text objects for menu/to give hints
tilemap
physics system to move around

*/