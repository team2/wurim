(function() {
  window.onload = function() {
    Crafty.mobile = false;
    Crafty.init(WINDOW_WIDTH, WINDOW_HEIGHT);
    Crafty.canvas.init();
    Crafty.background('black');
    return Crafty.scene('game');
  };

}).call(this);
