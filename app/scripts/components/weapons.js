// Base class for all weapons.
// Weapons are divided into two categories: Bullet and Extreme.
Crafty.c('Weapon', {
  init: function() {
    this.requires("2D, Canvas, Collision");
    this.attr({
      damage: 10
    });
  },
  place: function(x, y) {
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
    this.bind('EnterFrame', this.move);
  },
  move: function() {
    if (this.y < 0 || this.y > Game.width()
      || this.x < 0 || this.x > Game.height())  {
        this.destroy();
        return;
      }
      this.y -= this.speed_y;
      this.x -= this.speed_x;
  }
});


Crafty.c('PlayerInitBullet', {
  init: function() {
    this.requires('Bullet, Color');
    this.attr({
      damage: 10
    });
    this.color('#46D898');
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
    this.requires("Extreme, Colors");
    this.attr({w:50, h:50});
    this.color('#cccccc');
    var total_damage = 100;
    this.bind("EnterFrame", function() {
      var enemies = Crafty('Enemy');
      var dmg = Math.min(10, total_damage);
      for(i = 0; i < enemies.length; i++) {
        enemies[i].damage(dmg);
      }
      total_damage -= dmg;
      if(total_damage <= 0) {
        this.destroy();
      }
    });
  }
});
