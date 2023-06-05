let config={
    type: Phaser.CANVAS,
    render: {
        pixelArt:true
    },
    width: 640,
    height:640,
    physics:{
        default: "arcade",
        arcade:{
            debug:true
        }
    },
    zoom: 2,
    scene: [Menu,Overworld]
}
const game = new Phaser.Game(config)

let borderUISize=game.config.height/15;
let borderPadding=borderUISize/3;
let mouse,keyF,keyR,keyLEFT,keyRIGHT;