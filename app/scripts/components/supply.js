Crafty.c('FallingSupply', {
  init: function() {
    this.requires('2D, Canvas, Collision');
    this.attr({
      w: 60,
      h: 60,
      speed: 9,
      supply: null,
      collectable: true
    });
    this.bind("EnterFrame", this.moving);
    this.onHit('Player', function(event) {
      var player = event[0].obj;
      this.onHitPlayer(player);
    });
  },

  onHitPlayer: function(player) {
    var s = Crafty.e(this.supply);
    if(this.collectable) {
      player.collectSupply(s);
    } else {
      s.doSupply(player);
    }
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
      supply: 'BoomSupply'
    });
    this.collision(
        new Crafty.polygon([10, 0], [10, 50], [50, 10], [50, 50]));
  }
});


Crafty.c('HPFallingSupply', {
  init: function() {
    this.requires('FallingSupply, hp_falling_supply');
    this.attr({
      supply: 'HPSupply',
      collectable: false
    });
    this.collision(
        new Crafty.polygon([10, 0], [10, 50], [50, 10], [50, 50]));
  }
});


Crafty.c('Supply', {
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


Crafty.c('HPSupply', {
  init: function() {
    this.attr({
      hp: 10 
    });
  },
  doSupply: function(player) {
    player.heal(this.hp);
  }
});
