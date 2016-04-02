
// getting width and height of browser
var WIDTH = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var HEIGHT = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

// creating instance of Phaser.Game
var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.CANVAS, '', { preload: preload, create: create, update: update, render: render});

// phaser function for loading assets
function preload() {

  // loading assets
  game.load.image('background', 'assets/background.jpg');
  game.load.image('crosshair', 'assets/crosshair.png');
  //game.load.spritesheet('target', 'assets/target.png', 39, 121);
  game.load.spritesheet('target', 'assets/dude.png', 32, 48);

  game.time.advancedTiming = true;

}

// variable declarations
var worldScale = 1;
var background;
var snipingCam;
var mask;
var target;
var cursors;

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
  //game.physics.arcade.enable(target);
  //target.body.gravity.y = 300;
  // target.animations.add('left', [13, 6, 7, 8, 9, 10, 11], 10, true);
  // target.animations.add('right', [12, 0, 1, 2, 3, 4, 5], 10, true);

  backgroundGroup.add(background);
  backgroundGroup.add(target);

  // circle that acts as a sniping camera
  snipingCam = game.add.graphics(150, 150);
  // drawing red border line
  snipingCam.lineStyle(3, 0xff0004);
  snipingCam.beginFill(0xff0000, 0.2);
  snipingCam.drawCircle(0, 0, 300);
  snipingCam.drawCircle(0, 0, 2);
  snipingCam.endFill();

  // creating mask
  mask = game.add.graphics(0, 0);

  // coloring
  mask.beginFill(0xffffff);

  // drawing circle
  mask.drawCircle(150, 150, 300);

  // applying the mask to the background group
  backgroundGroup.mask = mask;

  // adding snipingCam and mask to crosshair group
  crosshair.add(snipingCam);
  crosshair.add(mask);

  // following the crosshair
  game.camera.follow(crosshair);

  // tracking the mouse position and accelerate to it
  game.input.addMoveCallback(moveCrosshair, this);

  //game.camera.focusOn(crosshair);

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


  // debugging
  if (game.input.keyboard.isDown(Phaser.Keyboard.P)) {
      console.log(snipingCam.x,snipingCam.y);
      console.log(crosshair.x,crosshair.y);
  }

  // firing bullet
  if (game.input.activePointer.leftButton.isDown || game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
    // console.log(target.x);
    // console.log(target.y);
    console.log(snipingCam.x,snipingCam.y);
    console.log(crosshair.x,crosshair.y);
    //target.kill();
    // play bullet sound

    // checking if the bullet hit the target or not
    if (checkTargetHit(32, 0, target)) {
      // remember that the coordinates of crosshair of the are to be tested against the bounds of target bounds in checkTargetHit() function
      target.kill();
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
  worldScale = Phaser.Math.clamp(worldScale, 1, 1.5);

  // set our world scale as needed
  game.world.scale.set(worldScale);

  if (worldScale != 1) {
    //console.log(background.height);
  }
  // focusing on pointer (zooming on mouse pointer)

}


function render(game) {
  game.debug.text(game.time.fps || '--', 2, 14, "#ff0004");
}

// custom function for
function moveCrosshair(pointer, x, y) {
  crosshair.x = x - 150;
  crosshair.y = y - 150;
}

// getting
function getCrosshairX(pointer, x) {
  return (x - 150);
}

function getCrosshairY(pointer, y) {
  return (y - 150);
}

function checkTargetHit(x1, y1, target) {
  var crosshairCenter = {x: x1, y: y1};
  var targetBounds = target.getBounds();

  return Phaser.Rectangle.containsPoint(targetBounds, crosshairCenter);
}
