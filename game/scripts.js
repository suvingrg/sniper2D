
// getting width and height of browser
var WIDTH = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var HEIGHT = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

// creating instance of Phaser.Game
var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, '', { preload: preload, create: create, update: update });

// phaser function for loading assets
function preload() {

  // loading assets
  game.load.image('background', 'assets/bg.jpg');
  game.load.image('crosshair', 'assets/crosshair.png');

}

var snipingCam;
var crosshair;
var shiftKey;
var cursors;

// phaser function for modifying the UI
function create() {

  // setting game bounds
  game.world.setBounds(0, 0, 2560, 1440);
  // enabling phaser's P2 physics engine
  game.physics.startSystem(Phaser.Physics.P2JS);

  // adding background to game.world
  game.add.sprite(0, 0, 'background');
  // adding crosshair
  crosshair = game.add.sprite(0, 0, 'crosshair');
  // crosshair.scale.setTo(1, 1);

  // adding shift key and keyboard cursors to game
  shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
  cursors = game.input.keyboard.createCursorKeys();

  var c = new Phaser.Circle(150, 150, 300);

  // circle that acts as a sniping camera
  snipingCam = game.add.graphics(150, 150);
  // drawing red border line
  snipingCam.lineStyle(3, 0xff0004);
  snipingCam.beginFill(0xff0004, 0.2);
  snipingCam.drawCircle(0, 0, 300);
  snipingCam.endFill();


}

// phaser function that runs every frame and updates the UI
function update() {

  if (shiftKey.isDown) {
    if (cursors.right.isDown) {
      game.camera.x += 7;
    }
  }


}
