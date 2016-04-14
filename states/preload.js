
sniper2D.preload = function (game) {

	// variables to be used in this state
	this.background = null;
	this.preloadBar = null;

};

sniper2D.preload.prototype = {

	preload: function () {

		// enabling phaser's physics engine
	  this.physics.startSystem(Phaser.Physics.ARCADE);

		//	These are the assets we loaded in Boot.js
		this.background = this.add.sprite(0, 0, 'preloadBG');
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloadBar');
		this.preloadBar.anchor.setTo(0.5, 0.5);

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		// loading other required assets
		this.load.image('menuBG', 'assets/bg_menu.jpg');
		this.load.image('gameTitle', 'assets/game_title.png');
		this.load.image('missionComplete', 'assets/mission_complete.png');
		this.load.image('dpad', 'assets/cursors.png');
		this.load.image('we', 'assets/we.png');
		this.load.image('spacebar', 'assets/spacebar.png');
		this.load.image('won', 'assets/won.png');
		this.load.image('blood', 'assets/blood.png');
		this.load.spritesheet('quitButton', 'assets/quit_button.png', 167, 70);
		this.load.spritesheet('playButton', 'assets/play_button.png', 167, 70);
		this.load.spritesheet('backButton', 'assets/back_button.png', 168, 70);
		this.load.spritesheet('continueButton', 'assets/continue_button.png', 268, 70);
		this.load.spritesheet('restartButton', 'assets/restart_button.png', 268, 70);
		this.load.image('blackBackground', 'assets/black_background.png');
		this.load.image('mission1BG', 'assets/bg_mission1.jpg');
		this.load.image('mission2BG', 'assets/bg_mission2.jpg');
		this.load.image('mission3BG', 'assets/bg_mission3.jpg');

	  // target spritesheet
	  this.load.atlasJSONArray('target1', 'assets/target/target1.png', 'assets/target/target1.json');
		this.load.atlasJSONArray('target2', 'assets/target/target2.png', 'assets/target/target2.json');
		this.load.atlasJSONArray('target3', 'assets/target/target3.png', 'assets/target/target3.json');

		this.load.bitmapFont('destroy', 'assets/fonts/destroy.png', 'assets/fonts/destroy.fnt');
		this.load.bitmapFont('gunplay', 'assets/fonts/gunplay.png', 'assets/fonts/gunplay.fnt');

	  // loading audio
		this.load.audio('wind', 'assets/audio/wind.wav');
		this.load.audio('helicopter', 'assets/audio/helicopter.wav');
		this.load.audio('gunshot', 'assets/audio/shot.wav');
		this.load.audio('dying', 'assets/audio/dying.wav');
		this.load.audio('bgMusic', 'assets/audio/bg_music.mp3');

	  // debugging for fps
	  this.time.advancedTiming = true;

	},

	create: function () {

		// this.background.destroy();
		this.preloadBar.destroy();

		this.state.start('menu');

	}

};
