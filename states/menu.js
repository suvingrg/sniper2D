
sniper2D.menu = function (game) {

	// declaring the variables to be used in this state
	this.music = null;
	this.gunshot = null;
	this.menuBG = null;
	this.gameTitle = null;
	this.playButton = null;

};

sniper2D.menu.prototype = {

	create: function () {

    this.menuBG = this.add.image(0, 0, 'menuBG');
		this.menuBG.width = this.game.width;
		this.menuBG.height = this.game.height;
		this.gameTitle = this.add.sprite(this.camera.width * 0.5, this.camera.height * 0.5 - 150, 'gameTitle');
		this.gameTitle.anchor.setTo(0.5);
		this.gameTitle.fixedToCamera = true;

		this.gunshot = this.add.audio('gunshot');

		this.playButton = this.add.button(this.camera.width * 0.5, this.camera.height * 0.5, 'playButton', this.startGame, this, 0, 1, 2);
		this.playButton.anchor.setTo(0.5);
		this.playButton.fixedToCamera = true;
		this.music = this.add.audio('bgMusic');
		this.sound.setDecodedCallback(this.music, function () {
				this.music.play('', 0, 1, true);
		}, this);

	},

	startGame: function () {

		this.gunshot.play();
		this.time.events.add(1000, this.freeUpMem, this);
		this.time.events.add(1000, function () { this.state.start('mission1'); }, this);

	},

	freeUpMem: function () {

		this.music.destroy();
		this.menuBG.destroy();
		this.gameTitle.destroy();
		this.playButton.destroy();
		this.gunshot.destroy();

	}

};
