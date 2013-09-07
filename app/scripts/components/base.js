// An "Actor" is an entity that is drawn in 2D on canvas
//  via our logical coordinate grid
Crafty.c('Actor', {
  init: function() {
    this.requires('2D, DOM');
  },

  // Locate this entity at the given position on the grid
  at: function(x, y) {
    if (x === undefined && y === undefined) {
      return { x: 0, y: 0 }
    } else {
      this.attr({ x: x, y: y });
      return this;
    }
  }
});

Crafty.c('Health', {
    init: function() {
        this.requires('Actor, health');
    },
})
