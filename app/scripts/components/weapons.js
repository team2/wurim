// Base class for all weapons.
// Weapons are divided into two categories: Bullet and Extreme.
Crafty.c('Weapon', {
  init: function() {
    this.requires("2D, Canvas, Collision");
    this.attr({
      damage: 10
    });
  },
  fireAt: function(x, y) {
    this.x = x;
    this.y = y;
  }
});


// Base class for all bullet-like weapons.
Crafty.c('Bullet', {
  init: function() {
    this.requires('Weapon');
    this.attr({
      speed_x: 0,
      speed_y: 25
    });
    this.bind('EnterFrame', this.moving);
  },
  moving: function() {
    if (this.y < 0 || this.y > Game.height
      || this.x < 0 || this.x > Game.width)  {
        this.destroy();
        return;
      }
      this.y -= this.speed_y;
      this.x -= this.speed_x;
  },
});


Crafty.c('PlayerBullet', {
  init: function() {
    this.requires('Bullet');
    this.onHit('Enemy', function(event) {
      var enemy = event[0].obj;
      this.onHitEnemy(enemy);
    });
  },

  onHitEnemy: function(enemy) {
    enemy.hurt(this.damage);
    this.destroy();
  }
});


Crafty.c('PlayerInitBulletLeft', {
  init: function() {
    this.requires('PlayerBullet, bullet2');
    this.attr({
      damage: 10,
    });
  },
});

Crafty.c('PlayerInitBulletRight', {
  init: function() {
    this.requires('PlayerBullet, bullet3');
    this.attr({
      damage: 10,
    });
  },
});


// Base class for all extreme.
Crafty.c('Extreme', {
  init: function() {
    this.requires('Weapon');
  }
});

//  --------------------------------------
// The extreme

Crafty.c('Boom', {
  init: function() {
    this.requires("Extreme, Color");
    this.attr({w: 50, h: 50, x: 100, y: 100});
    this.color('#cccccc');
    var total_damage = 100;
    this.bind("EnterFrame", function() {
      var dmg = Math.min(2, total_damage);
      Crafty('Enemy').each(function() {
        this.hurt(dmg);
      });
      total_damage -= dmg;
      if(total_damage <= 0) {
        this.destroy();
      }
    });
  }
});
