
// getting width and height of browser
var WIDTH = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var HEIGHT = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

// creating instance of Phaser.Game
var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.CANVAS, '', { preload: preload, create: create, update: update, render: render});

// phaser function for loading assets
function preload() {

  // loading assets
  game.load.image('background', 'assets/background.jpg');

  // loading target spritesheet
  // game.load.atlasJSONHash('target', 'assets/target1/target.png', 'assets/target1/target.json');
  game.load.atlasJSONArray('target', 'assets/target/target.png', 'assets/target/target.json');

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

var indicator;

// group declarations
var backgroundGroup;
var crosshair;

// phaser function for setting up game.world
function create() {

  // setting game bounds
  game.world.setBounds(0, 0, 1495, 1000);

  // enabling phaser's physics engine
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // adding background to game.world
  background = game.add.image(0, 0, 'background');

  // creating groups
  backgroundGroup = game.add.group();
  crosshair = game.add.group();

  // adding target to game.world
  target = game.add.sprite(0, 170, 'target', 6);
  target.animations.add('move', '', 5, true);
  target.animations.play('move');
  // enabling physics in target sprite
  game.physics.arcade.enable(target);
  // target will collide with world bounds so that it won't be out of game.world
  target.body.collideWorldBounds = true;
  // target.body.gravity.y = 100;

  indicator = game.add.graphics(150, 150);
  // drawing red border line
  indicator.lineStyle(3, 0xffffff);
  indicator.beginFill(0xff0000, 0.2);
  indicator.drawCircle(0, 0, 2);
  indicator.endFill();

  // add gunshot to the game so we can play it later
  gunshot = game.add.audio('gunshot');

  // adding hole that is rendered if the player misses the target after firing the bullet
  hole = game.add.graphics(0, 0);
  hole.beginFill(0x000, 1);
  hole.drawCircle(0, 0, 10);
  hole.endFill();
  hole.visible = false;

  // adding background to the backgroundGroup
  backgroundGroup.add(background);

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

    // play bullet sound
    gunshot.play();

    // getting actual crosshair coordinates respective to the game.world.scale
    if (worldScale == 1) {

      crosshairX = getActualCrosshairX(0);
      crosshairY = getActualCrosshairY(0);

    }
    else if (worldScale > 1 && worldScale <= 1.1) {

      crosshairX = getActualCrosshairX(10);
      crosshairY = getActualCrosshairY(10);
      console.log(crosshairX,crosshairY);

    }
    else if (worldScale > 1.1 && worldScale <= 1.2) {

      crosshairX = getActualCrosshairX(10);
      crosshairY = getActualCrosshairY(22);
      console.log(crosshairX,crosshairY);

    }
    else if (worldScale > 1.2 && worldScale <= 1.3) {

      crosshairX = getActualCrosshairX(10);
      crosshairY = getActualCrosshairY(52);
      console.log(crosshairX,crosshairY);

    }
    else if (worldScale > 1.3 && worldScale <= 1.4) {

      crosshairX = getActualCrosshairX(10);
      crosshairY = getActualCrosshairY(52);
      console.log(crosshairX,crosshairY);

    }
    else if (worldScale > 1.4 && worldScale <= 1.5) {

      crosshairX = getActualCrosshairX(10);
      crosshairY = getActualCrosshairY(79);
      console.log(crosshairX,crosshairY);

    }
    else if (worldScale > 1.5 && worldScale <= 1.6) {

      crosshairX = getActualCrosshairX(10);
      crosshairY = getActualCrosshairY(99);
      console.log(crosshairX,crosshairY);

    }
    else if (worldScale > 1.6 && worldScale <= 1.7) {

      crosshairX = getActualCrosshairX(10);
      crosshairY = getActualCrosshairY(119);
      console.log(crosshairX,crosshairY);

    }
    else if (worldScale > 1.7 && worldScale >= 1.75) {

      crosshairX = getActualCrosshairX(10);
      crosshairY = getActualCrosshairY(132);
      console.log(crosshairX,crosshairY);

    }

    // debugging
    var result = checkTargetHit(crosshairX, crosshairY, target);
    console.log(result);
    console.log(crosshairX, crosshairY);

    //checking if the bullet hit the target or not
    if (checkTargetHit(crosshairX, crosshairY, target)) {

      // disposing the target sprite
      target.kill();

    }
    else {

      // repositioning the hole
      hole.x = crosshairX;
      hole.y = crosshairY;
      hole.visible = true;

    }

  }

  // zooming in and out
  if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
      worldScale += 0.05;
  }
  else if (game.input.keyboard.isDown(Phaser.Keyboard.E)) {
      worldScale -= 0.05;
  }

  // set a minimum and maximum scale value
  worldScale = Phaser.Math.clamp(worldScale, 1, 1.75);

  // set our world scale as needed
  game.world.scale.set(worldScale);

  if (game.input.keyboard.isDown(Phaser.Keyboard.T)) {
      console.log(worldScale);
  }

  // debugging
  if (game.input.keyboard.isDown(Phaser.Keyboard.P)) {
    target.revive();
    updateIndicator(crosshair.x,crosshair.y);
  }

  if (game.input.keyboard.isDown(Phaser.Keyboard.L)) {
    target.x += 2;
  }

}


function render(game) {
  game.debug.text(game.time.fps || '--', 2, 14, "#ff0004");
  game.debug.spriteInfo(target, 32, 32);
  game.debug.spriteBounds(target);
}


function moveCrosshair(pointer, x, y) {
  crosshair.x = x - 90;
  crosshair.y = y - 90;
}

function getActualCrosshairX(factor) {
  return (crosshair.x + (90 + factor));
}

function getActualCrosshairY(factor) {
  return (crosshair.y + (90 + factor));
}

function checkTargetHit(x1, y1, target) {
  var crosshairCenter = {x: x1, y: y1};
  var targetBounds = target.getBounds();

  return Phaser.Rectangle.containsPoint(targetBounds, crosshairCenter);
}

function updateIndicator(x, y) {
  indicator.x = x + 90;
  indicator.y = y + 90;
  console.log(indicator.x, indicator.y);
}
