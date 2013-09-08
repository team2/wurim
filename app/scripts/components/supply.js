Crafty.c('FallingSupply', {
  init: function() {
    this.requires('2D, Canvas, Collision');
    this.attr({
      w: 0,
      h: 0,
      speed: 2,
      supply: null
    });
    this.bind("EnterFrame", this.moving);
    this.onHit('Player', function(event) {
      var player = event[0].obj;
      this.onHitPlayer(player);
    });
  },

  onHitPlayer: function(player) {
    player.collectSupply(Crafty.e(this.supply));
    Crafty.audio.play('supply01')
    this.destroy();
  },

  place: function(x) {
    return this.attr({
      x: x,
      y: -100
    });
  },

  moving: function() {
    if (this.y > WINDOW_HEIGHT) {
      this.destroy();
    }
    return this.y += this.speed;
  },
});


Crafty.c('BoomFallingSupply', {
  init: function() {
    this.requires('FallingSupply, boom_falling_supply');
    this.attr({
      w: 60,
      h: 60,
      speed: 9,
      supply: 'BoomSupply'
    });
  }
});


Crafty.c('Supply', {
  widgetSprite: null,
  init: function() {
    this.requires('Actor');
  },
});


Crafty.c('BoomSupply', {
  init: function() {
    this.requires('Supply, boom_supply');
  },
  doSupply: function(player) {
    Crafty.e('Boom');
  }
});
