class Menu extends Phaser.Scene {
    constructor() {
        super("Menu");
        //I need a commit for my code to run
    }
    preload() {
        // load audio 
      }
      create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '16px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
              
        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding*2, 'Meshes of the afternoon', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use the arrow keys to move\nand space to interact', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + 2*borderPadding, 'Press → to continue', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 3*borderUISize + borderPadding, 'Credit to Twitter @gif_not_jif\nfor the character/tilemap assets', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          this.scene.start('Overworld',{ inventory: "Inventory", mug: false, key: false, knife: false});    
        }
        //if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
   //         this.scene.start("menuScene");
 //         }
      }
}