
// getting width and height of browser
var WIDTH = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var HEIGHT = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

// creating instance of Phaser.Game
var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.CANVAS, '', { preload: preload, create: create, update: update, render: render});

// phaser function for loading assets
function preload() {

  // loading assets
  game.load.image('background', 'assets/background.jpg');

  //game.load.spritesheet('target', 'assets/target.png', 39, 121);
  game.load.spritesheet('target', 'assets/dude.png', 32, 48);

  // shot sound
  game.load.audio('gunshot', ['assets/shot.mp3', 'assets/shot.ogg', 'assets/shot.wav']);

  // debugging for fps
  game.time.advancedTiming = true;

}

// variable declarations
var worldScale = 1;
var background;
var snipingCam;
var mask;
var target;
var gunshot;
var hole;
var cursors;
var crosshairX;
var crosshairY;

// group declarations
var backgroundGroup;
var crosshair;

// phaser function for modifying the UI
function create() {

  // setting game bounds
  game.world.setBounds(0, 0, 1400, 1400);
  // enabling phaser's physics engine
  game.physics.startSystem(Phaser.Physics.P2JS);

  // adding background to game.world
  background = game.add.image(0, 0, 'background');

  // creating groups
  backgroundGroup = game.add.group();
  crosshair = game.add.group();

  target = game.add.sprite(32, 0, 'target');
  target.scale.set(2);

  gunshot = game.add.audio('gunshot');
  hole = game.add.graphics(90, 90);
  hole.beginFill(0x000, 1);
  hole.drawCircle(0, 0, 10);
  hole.endFill();
  hole.visible = false;
  //game.physics.arcade.enable(target);
  //target.body.gravity.y = 300;
  // target.animations.add('left', [13, 6, 7, 8, 9, 10, 11], 10, true);
  // target.animations.add('right', [12, 0, 1, 2, 3, 4, 5], 10, true);

  backgroundGroup.add(background);
  backgroundGroup.add(target);

  // circle that acts as a sniping camera
  snipingCam = game.add.graphics(90, 90);
  // drawing red border line
  snipingCam.lineStyle(3, 0xff0004);
  snipingCam.beginFill(0xff0000, 0.2);
  snipingCam.drawCircle(0, 0, 170);
  snipingCam.drawCircle(0, 0, 2);
  snipingCam.endFill();


  // creating mask
  mask = game.add.graphics(0, 0);

  // coloring
  mask.beginFill(0xffffff);

  // drawing circle
  mask.drawCircle(90, 90, 170);

  // applying the mask to the background group
  backgroundGroup.mask = mask;

  // adding snipingCam and mask to crosshair group
  crosshair.add(snipingCam);
  crosshair.add(mask);

  // following the crosshair
  game.camera.follow(crosshair);

  // tracking the mouse position and accelerate to it
  game.input.addMoveCallback(moveCrosshair, this);

  // adding shift key and keyboard cursors to game
  shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
  cursors = game.input.keyboard.createCursorKeys();

}

// phaser function that runs every frame and updates the UI
function update(pointer, x, y) {

  // crosshair movement
  if (cursors.left.isDown)
  {
    crosshair.x -= 5;
  }
  else if (cursors.right.isDown)
  {
    crosshair.x += 5;
  }
  else if (cursors.up.isDown) {
    crosshair.y -= 5;
  }
  else if (cursors.down.isDown) {
    crosshair.y += 5;
  }

  // firing bullet
  if (game.input.activePointer.leftButton.isDown || game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {

    // play bullet
    gunshot.play();

    crosshairX = getActualCrosshairX();
    crosshairY = getActualCrosshairY();

    console.log(crosshair.x, crosshair.y);

    //checking if the bullet hit the target or not
    if (checkTargetHit(crosshairX, crosshairY, target)) {
      // remember that the coordinates of crosshair of the are to be tested against the bounds of target bounds in checkTargetHit() function
      target.kill();
    }
    else {
      hole.x = crosshairX;
      hole.y = crosshairY;
      hole.visible = true;
    }

  }

  // zooming in and out
  if (game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
      worldScale += 0.05;
  }
  else if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
      worldScale -= 0.05;
  }

  // set a minimum and maximum scale value
  worldScale = Phaser.Math.clamp(worldScale, 0.75, 1.75);

  // set our world scale as needed
  game.world.scale.set(worldScale);

}


function render(game) {
  game.debug.text(game.time.fps || '--', 2, 14, "#ff0004");
}

// custom function for
function moveCrosshair(pointer, x, y) {
  crosshair.x = x - 90;
  crosshair.y = y - 90;
  console.log();
}

function getActualCrosshairX() {
  return crosshair.x + 90;
}

function getActualCrosshairY() {
  return crosshair.y + 90;
}

function checkTargetHit(x1, y1, target) {
  var crosshairCenter = {x: x1, y: y1};
  var targetBounds = target.getBounds();

  return Phaser.Rectangle.containsPoint(targetBounds, crosshairCenter);
}
