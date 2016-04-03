
var sniper2D = {};

sniper2D.boot = function (game) {};

sniper2D.boot.prototype = {

  // setting the iniial game configuration
  init: function () {

      //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
      this.input.maxPointers = 1;

      //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
      this.stage.disableVisibilityChange = true;

  },

  preload: function () {

      //  Here we load the assets required for our preloader (in this case a background and a loading bar)
      this.load.image('preloadBG', 'assets/preloader_bg.png');
      this.load.image('preloadBar', 'assets/loading.png');

  },

  create: function () {

      //  So now let's start the real preloader going
      this.state.start('preload');

  }
};
