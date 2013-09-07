(function() {
  Crafty.c('Character', {
    init: function() {
      this.requires('2D, Canvas, Color, Collision');
      this.attr({
        hp: undefined,
        x: undefined,
        y: undefined
      });
    },
  });
}).call(this);
