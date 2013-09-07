window.app = window.app || {}
app.startGame = function () {
  Crafty.mobile = false;
  Crafty.init(WINDOW_WIDTH, WINDOW_HEIGHT);
  Crafty.canvas.init();
  Crafty.background('black');
  Crafty.scene('game');
}

