// Base class for all weapons.
// Weapons are divided into two categories: Bullet and Extreme.
Crafty.c('Weapon', {
    init: function() {
        this.requires("2D, Canvas, Collision");
        this.attr({
            damage: 10
        });
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
    };
});


// Base class for all extreme.
Crafty.c('Extreme', {
    init: function() {
        this.requires('Weapon');
    };
});

//  --------------------------------------
// The extreme

Crafty.c('TheExtreme', {
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
  };
});
