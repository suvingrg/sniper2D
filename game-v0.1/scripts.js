
// getting width and height of browser
var WIDTH = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var HEIGHT = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

// creating instance of Phaser.Game
var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render});

// loading assets
function preload() {

  // loading assets
  game.load.image('background', 'assets/background.jpg');
  game.load.image('crosshair', 'assets/crosshair.png');
  game.load.spritesheet('target', 'assets/target.png', 39, 121);

}

var worldScale = 1;
var snipingCam;
var target;
var cursors;

// phaser function for modifying the UI
function create() {

  // setting game bounds
  game.world.setBounds(0, 0, 1400, 1000);
  // enabling phaser's physics engine
  game.physics.startSystem(Phaser.Physics.P2JS);

  // adding background to game.world
  game.add.image(0, 0, 'background');

  // adding shift key and keyboard cursors to game
  shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
  cursors = game.input.keyboard.createCursorKeys();

  //var c = new Phaser.Circle(150, 150, 300);

  // circle that acts as a sniping camera
  snipingCam = game.add.graphics(150, 150);
  // drawing red border line
  snipingCam.lineStyle(3, 0xff0004);
  snipingCam.beginFill(0xff0004, 0.2);
  snipingCam.drawCircle(0, 0, 300);
  snipingCam.drawCircle(0, 0, 2);
  snipingCam.endFill();

  //game.physics.p2.enable(snipingCam, true);
  //snipingCam.body.setCircle(150);
  //snipingCam.body.setZeroDamping();
	//snipingCam.body.fixedRotation = true;
  game.camera.follow(snipingCam);

  //target = game.add.sprite(32, game.world.height - 150, 'target');
  //game.physics.p2.enable(target, true);
  //target.body.gravity.y = 300;
  //target.animations.add('left', [13, 6, 7, 8, 9, 10, 11], 10, true);
  //  target.animations.add('right', [12, 0, 1, 2, 3, 4, 5], 10, true);

  game.input.addMoveCallback(moveCam, this);

}

// phaser function that runs every frame and updates the UI
function update() {



  // zooming in and out
  if (game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
      worldScale += 0.05;
  }
  else if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
      worldScale -= 0.05;
  }

  // set a minimum and maximum scale value
  worldScale = Phaser.Math.clamp(worldScale, 1, 1.5);

  // set our world scale as needed
  game.world.scale.set(worldScale);

}

function render(game) {
  game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
}

function moveCam(pointer, x, y) {
  snipingCam.x = x;
  snipingCam.y = y;
}
