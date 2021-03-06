
sniper2D.mission3 = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
  this.worldScale = 1;
  this.background = null;
  this.music = null;
  this.snipingCam = null;
  this.gunshot = null;
  this.hole = null;
  this.cursors = null;
  this.crosshairX = null;
  this.crosshairY = null;
  this.blood = null;
  this.dyingSound = null;

  this.blackBackground = null;
  this.distance = null;
  this.direction = null;
  this.startText = null;

  this.container = null;
  this.missionComplete = null;
  this.backButton = null;
  this.continueButton = null;

  this.gameConfig = false;
  this.targetInfo = null;
  this.missionText = null;
  this.debugInfo = false;
  this.fadeIn = null;
  this.fadeIn = null;

  this.topBar = null;
  this.bottomBar = null;
  this.distanceInfo = null;
  this.distanceText = null;


  // group declarations
  this.backgroundGroup = null;
  this.crosshair = null;
  this.target = null;
  this.endMenu = null;
  this.info = null;

  this.result= null;

};

sniper2D.mission3.prototype = {

	create: function () {

    this.blackBackground = this.add.image(0, 0, 'blackBackground');
    this.blackBackground.width = 1366;
    this.blackBackground.height = 621;
    this.missionText = this.add.bitmapText(this.camera.width * 0.5, this.camera.height * 0.5 - 200, 'destroy', 'MISSION 3', 64);
    this.missionText.anchor.setTo(0.5);
    this.missionText = this.add.bitmapText(this.camera.width * 0.5, this.camera.height * 0.5 - 100, 'gunplay', 'SHOOT THE CEO!!!', 64);
    this.missionText.anchor.setTo(0.5);

    this.startText = this.add.bitmapText(this.camera.width * 0.5, this.camera.height * 0.5, 'destroy', 'LOADING', 48);
    this.startText.anchor.setTo(0.5);
    this.startText.alpha = 0.1;
    this.fadeIn = this.add.tween(this.startText).to({alpha: 1}, 500, 'Linear', true);
    this.fadeIn.repeat(10, 500);

    this.time.events.add(7000, this.mainCreate, this);

	},

	update: function (pointer, x, y) {

    if (this.gameConfig === true) {
      this.mainUpdate();
    }

	},

	quitGame: function (pointer) {

    this.freeUpMem();

		this.state.start('menu');

	},

  nextLevel: function () {

    this.freeUpMem();

    this.state.start('mission4');

  },

  freeUpMem: function () {

    this.worldScale = null;
    this.background.destroy();
    this.music.destroy();
    this.snipingCam.destroy();
    this.gunshot.destroy();
    this.hole.destroy();
    this.cursors = null;
    this.crosshairX = null;
    this.crosshairY = null;
    this.blood.destroy();
    this.dyingSound.destroy();

    this.blackBackground.destroy();
    this.distance = null;
    this.direction = null;
    this.startText.destroy();

    this.container.destroy();
    this.missionComplete.destroy();
    this.backButton.destroy();
    this.continueButton.destroy();

    this.gameConfig = null;
    this.targetInfo = null;
    this.missionText.destroy();
    this.debugInfo = null;
    this.fadeIn = null;

    this.topBar.destroy();
    this.bottomBar.destroy();
    this.distanceInfo.destroy();
    this.distanceText = null;

    this.backgroundGroup.destroy();
    this.crosshair.destroy();
    this.target.destroy();
    this.endMenu.destroy();
    this.info.destroy();

    this.result = null;
    this.loaded = false;

  },

  render: function (game) {

    if (this.debugInfo) {
      game.debug.text(this.time.fps || '--', 2, 20, "#ff0004", 'Verdana');
      game.debug.text('MISSION 3', this.camera.width * 0.5 - 150, 50, "#0000ff", ' 48px Verdana');
      game.debug.text('TARGET INFO : ' + Math.round(Math.abs(this.distance / 4)) + this.direction, this.camera.width * 0.5 - 200, this.camera.height - 20, "#0000ff", ' 32px Verdana');
    }

  },

  getActualCrosshairX: function (factor) {
    return (this.crosshair.x + factor);
  },

  getActualCrosshairY: function (factor) {
    return (this.crosshair.y + factor);
  },

  checkTargetHit: function (x1, y1) {
    var targetBounds = this.target.getBounds();
    console.log(x1, y1, this.crosshair.x, this.crosshair.y, targetBounds);
    return targetBounds.contains(x1, y1);
  },

  mainCreate: function () {

    this.missionText = null;

    // setting up world bounds
    this.world.setBounds(0, 0, 3634, 1757);
    this.world.scale.set(1);

	  // adding background to this.world
	  this.background = this.add.image(0, 0, 'mission2BG');

	  // creating groups
	  this.backgroundGroup = this.add.group();
	  this.crosshair = this.add.group();

    this.music = this.add.audio('helicopter');
    this.music.play('', 0, 1, true);

    this.dyingSound = this.add.audio('dying');

	  // adding target to this.world
	  this.target = this.add.sprite(2072, 154, 'target3', 1);
    this.target.animations.add('turn', '', 0.7, true);
    this.target.animations.play('turn');
    this.target.scale.set(0.5);
	  // enabling physics in target sprite
	  this.physics.arcade.enable(this.target);

	  // target will collide with world bounds so that it won't be out of this.world
	  this.target.body.collideWorldBounds = true;

	  // add gunshot to the game so we can play it later
	  this.gunshot = this.add.audio('gunshot');

	  // adding hole that is rendered if the player misses the target after firing the bullet
	  this.hole = this.add.graphics(0, 0);
	  this.hole.beginFill(0x000, 1);
	  this.hole.drawCircle(0, 0, 1);
	  this.hole.endFill();
	  this.hole.visible = false;

	  // adding background to the backgroundGroup
	  this.backgroundGroup.add(this.background);
    this.backgroundGroup.add(this.target);

	  // circle that acts as a sniping camera
	  this.snipingCam = this.add.graphics(0, 0);
    this.snipingCam.lineStyle(3, 0xff0000);
    this.snipingCam.beginFill(0xff0000, 0.2);
    this.snipingCam.drawCircle(0, 0, 70);
    this.snipingCam.drawCircle(0, 0, 3);
	  this.snipingCam.endFill();

	  // adding snipingCam to crosshair group
	  this.crosshair.add(this.snipingCam);

	  // following the crosshair
	  this.camera.follow(this.crosshair);

	  // adding keyboard cursors to game
	  this.cursors = this.input.keyboard.createCursorKeys();

    this.blood = this.add.sprite(0, 0, 'blood');
    this.blood.anchor.setTo(0.5);
    this.blood.visible = false;

    this.info = this.add.group();

    this.topBar = this.add.graphics(0, 0);
    this.topBar.beginFill(0x252525, 1);
    this.topBar.drawRect(0, 0, this.camera.width, 40);
    this.topBar.endFill();

    this.missionText = this.add.bitmapText(this.camera.width * 0.5, 20, 'destroy', 'MISSION 3', 18);
    this.missionText.anchor.setTo(0.5);

    this.bottomBar = this.add.graphics(0, 0);
    this.bottomBar.beginFill(0x252525, 1);
    this.bottomBar.drawRect(0, this.camera.height - 70, this.camera.width, 70);
    this.bottomBar.endFill();
    this.distanceInfo = this.add.bitmapText(this.camera.width * 0.5 - 210, this.camera.height - 50, 'gunplay', 'TARGET INFO : ', 32);
    this.distanceText = this.add.bitmapText(this.camera.width * 0.5 + 10, this.camera.height - 50, 'gunplay', '', 32);

    this.info.add(this.topBar);
    this.info.add(this.missionText);
    this.info.add(this.bottomBar);
    this.info.add(this.distanceInfo);
    this.info.add(this.distanceText);
    this.info.fixedToCamera = true;

    this.endMenu = this.add.group();

    this.container = this.game.add.graphics(0, 0);
    this.container.beginFill(0x000000, 0.2);
    this.container.drawRect(0, 0,this.world.width, this.world.height);
    this.container.endFill();

    this.missionComplete = this.add.sprite(this.camera.width * 0.5, this.camera.height * 0.5 - 150, 'missionComplete');
    this.missionComplete.anchor.setTo(0.5);

    this.backButton = this.add.button(this.camera.width * 0.5 - 150, this.camera.height * 0.5 + 50, 'backButton', this.quitGame, this, 0, 1, 2);
		this.backButton.anchor.setTo(0.5);

    this.continueButton = this.add.button(this.camera.width * 0.5 + 100, this.camera.height * 0.5 + 50, 'continueButton', this.nextLevel, this, 0, 1, 2);
		this.continueButton.anchor.setTo(0.5);

    this.endMenu.add(this.container);
    this.endMenu.add(this.missionComplete);
    this.endMenu.add(this.backButton);
    this.endMenu.add(this.continueButton);
    this.endMenu.fixedToCamera = true;
    this.endMenu.visible = false;

    this.gameConfig = true;
    this.targetInfo = true;

  },

  mainUpdate: function () {

    // crosshair movement
    if (this.cursors.left.isDown)
    {
      this.crosshair.x -= 15;
    }
    else if (this.cursors.right.isDown)
    {
      this.crosshair.x += 15;
    }
    else if (this.cursors.up.isDown) {
      this.crosshair.y -= 15;
    }
    else if (this.cursors.down.isDown) {
      this.crosshair.y += 15;
    }

    // firing bullet
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {

      // play bullet sound
      this.gunshot.play();

      // getting actual crosshair coordinates respective to the this.game.world.scale
      if (this.worldScale == 1) {

        this.crosshairX = this.getActualCrosshairX(0);
        this.crosshairY = this.getActualCrosshairY(0);

        console.log(this.crosshairX, this.crosshairY);
        if (this.crosshairX >= 2072 && this.crosshairX <= 2081) {
          this.crosshairX -= 1389;
        }
        console.log(this.crosshairX, this.crosshairY);

        if (this.crosshairX >= 2082 && this.crosshairX <= 2114) {
          this.crosshairX -= 1408;
        }
        console.log(this.crosshairX, this.crosshairY);

      }
      else if (this.worldScale > 1.3 && this.worldScale <= 1.4) {

        this.crosshairX = this.getActualCrosshairX(10);
        this.crosshairY = this.getActualCrosshairY(65);

        console.log(this.crosshairX, this.crosshairY);
        if (this.crosshairX >= 2082 && this.crosshairX <= 2092) {
          this.crosshairX -= 1398;
        }
        console.log(this.crosshairX, this.crosshairY);

        if (this.crosshairX >= 2093 && this.crosshairX <= 2100) {
          this.crosshairX -= 1417;
        }
        console.log(this.crosshairX, this.crosshairY);
        if (this.crosshairY < 219) {
          this.crosshairY -= 100;
        }

        if (this.crosshairY > 249) {
          this.crosshairY += 100;
        }
        console.log(this.crosshairX, this.crosshairY);

      }

      // checking if the bullet hit the target or not
      if (this.checkTargetHit(this.crosshairX, this.crosshairY)) {

        this.result = this.checkTargetHit(this.crosshairX, this.crosshairY);
        console.log(this.result);

        this.dyingSound.play('', 0, 1, false);

        this.blood.visible = true;
        this.blood.x = this.crosshair.x;
        this.blood.y = this.crosshair.y;

        this.debugInfo = false;
        this.targetInfo = false;
        this.world.scale.set(1);
        this.info.visible = true;
        this.target.animations.stop('turn');

        this.time.events.add(1700, function () {
          // disposing the target sprite
          this.target.kill();
          this.blood.visible = false;
          this.distanceText.setText('DEAD');
          this.endMenu.visible = true;
        }, this);

      }
      else {

        this.hole.x = this.crosshair.x;
        this.hole.y = this.crosshair.y;
        this.hole.visible = true;

      }

    }

    if (this.targetInfo) {

      this.distance = this.target.x - this.crosshair.x;
      if (this.distance > 0) {
        this.distanceText.setText(Math.round(Math.abs(this.distance / 4)) + 'mm RIGHT');
        this.direction = 'mm RIGHT';
      }
      else {
        this.distanceText.setText(Math.round(Math.abs(this.distance / 4)) + 'mm LEFT');
        this.direction = 'mm LEFT';
      }

      // zooming in and out
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
          this.worldScale += 0.1;
          this.debugInfo = true;
          this.info.visible = false;
      }
      else if (this.game.input.keyboard.isDown(Phaser.Keyboard.E)) {
          this.worldScale -= 0.1;
          this.debugInfo = false;
          this.info.visible = true;
      }

      // set a minimum and maximum scale value
      this.worldScale = Phaser.Math.clamp(this.worldScale, 1, 1.4);

      // set our world scale as needed
      this.world.scale.set(this.worldScale);
    }

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.T)) {
        console.log(this.crosshair.x, this.crosshair.y);
        console.log(this.worldScale);
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.L)) {
        this.target.x += 1;
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.J)) {
        this.target.x -= 1;
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.U)) {
        console.log(this.camera.width, this.camera.height);
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.P)) {
        this.crosshair.x += 20;
    }

  }

};
