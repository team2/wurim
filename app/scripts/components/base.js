// An "Actor" is an entity that is drawn in 2D on canvas
//  via our logical coordinate grid
Crafty.c('Actor', {
  init: function() {
    this.requires('2D, DOM');
    this.attr({
      x: 0,
      y: 0
    })
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
  _padding: 5,
  _margin: 40,
  default_health: 3,
  init: function() {
    this.healths = []
    for(var i = 0; i != this.default_health; ++i){
      this.healths.push(Crafty.e('Actor, health').at(this._padding + i * this._margin, this._padding));
    }
    this._health_cursor = this.default_health - 1;
    this.bind('HealPlayer', function(){
      if(this._health_cursor == this.default_health - 1){
        return
      }
      this.healths[this._health_cursor++].visible = true;
    });
    this.bind('HurtPlayer', function(){
      if(this._health_cursor == -1){
        return;
      }else{
        this.healths[this._health_cursor--].visible = false;
      }
    })
  }
})
