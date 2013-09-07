(function() {
  Crafty.c('BoomCountdown', {
    init: function() {
      this.requires("2D, Color, Canvas");
      this.attr({x: 0, y: WINDOW_HEIGHT - 5, w: WINDOW_WIDTH, h: 5})
      this.percentage = 1.0;
      this.color('#66ccff');
      this.bind('EnterFrame', this.countdown);
      this.bind('KeyDown', this.keydown);
    },
    setKey: function(key) {
      this.key = key;
    },
    countdown: function() {
      this.percentage -= 0.03;
      if(this.percentage <= 0) {
        this.destroy();
      }
      this.w = WINDOW_WIDTH * this.percentage;
    },
    keydown: function(e) {
      if(e.key == this.key) {
        Crafty.e('Boom');
        this.destroy();
      }
    },
  });
}).call(this);
