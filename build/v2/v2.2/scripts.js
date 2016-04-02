
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
  game.world.setBounds(-1000, -1000, 2000, 2000);
  // enabling phaser's physics engine
  // game.physics.startSystem(Phaser.Physics.P2JS);

  // adding background to game.world
  background = game.add.image(-400, -400, 'background');

  // creating groups
  backgroundGroup = game.add.group();
  crosshair = game.add.group();

  target = game.add.sprite(0, 0, 'target');
  target.scale.set(2);
  //game.physics.arcade.enable(target);
  //target.body.gravity.y = 300;
  // target.animations.add('left', [13, 6, 7, 8, 9, 10, 11], 10, true);
  // target.animations.add('right', [12, 0, 1, 2, 3, 4, 5], 10, true);

  backgroundGroup.add(background);
  backgroundGroup.add(target);

  // circle that acts as a sniping camera
  snipingCam = game.add.graphics(0, 0);
  // drawing red border line
  snipingCam.lineStyle(3, 0xff0004);
  snipingCam.beginFill(0xff0000, 0.2);
  snipingCam.drawCircle(0, 0, 300);
  snipingCam.drawCircle(0, 0, 2);
  snipingCam.endFill();

  // // creating mask
  // mask = game.add.graphics(0, 0);
  //
  // // coloring
  // mask.beginFill(0xffffff);
  //
  // // drawing circle
  // mask.drawCircle(150, 150, 300);
  //
  // // applying the mask to the background group
  // backgroundGroup.mask = mask;
  //
  // // adding snipingCam and mask to crosshair group
  // crosshair.add(snipingCam);
  // crosshair.add(mask);
  //
  // // following the crosshair
  // game.camera.follow(crosshair);
  //
  // // tracking the mouse position and accelerate to it
  // game.input.addMoveCallback(moveCrosshair, this);

  //game.camera.focusOn(crosshair);

  // adding shift key and keyboard cursors to game
  shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
  cursors = game.input.keyboard.createCursorKeys();

  game.camera.x = (game.width * -0.5);
  game.camera.y = (game.height * -0.5);

}

// phaser function that runs every frame and updates the UI
function update(pointer, x, y) {

  // crosshair movement
  if (cursors.left.isDown)
  {
    game.world.pivot.x -= 10;
    snipingCam.x -= 10;
  }
  else if (cursors.right.isDown)
  {
    game.world.pivot.x += 10;
    snipingCam.x += 10;
  }
  else if (cursors.up.isDown) {
    game.world.pivot.y -= 10;
    snipingCam.y -= 10;
  }
  else if (cursors.down.isDown) {
    game.world.pivot.y += 10;
    snipingCam.y += 10;
  }

  // firing bullet
  if (game.input.activePointer.leftButton.isDown || game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {


    // play bullet sound

    // checking if the bullet hit the target or not

    var result = checkTargetHit(snipingCam.x, snipingCam.y, target);
    console.log(result);
    if (checkTargetHit(game.world.pivot.x, game.world.pivot.y, target)) {
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

// custom function
// function moveCrosshair(pointer, x, y) {
//   crosshair.x = x - 150;
//   crosshair.y = y - 150;
// }

function checkTargetHit(x1, y1, target) {
  console.log((x1 * -0.5) + 50);
  console.log(y1 * -0.5);

  var crosshairCenter = {x: ((x1 * -0.5) + 50), y: (y1 * -0.5)};
  var targetBounds = target.getBounds();

  console.log(targetBounds);
  return Phaser.Rectangle.containsPoint(targetBounds, crosshairCenter);
}
