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
      x_speed: undefined,
      y_speed: undefined,
      angle: undefined,
      speed: undefined
    });
    this.bind('EnterFrame', this.moving);
  },

  moving: function() {
    if (this.y < 0 || this.y > Game.height ||
        this.x < 0 || this.x > Game.width) {
      this.destroy();
      return;
    }
    if (this.angle !== undefined && this.speed !== undefined) {
      if (this.angle === 0 || this.angle === 360) {
        this.x_speed = this.speed;
        this.y_speed = 0;
      } else if (this.angle === 90) {
        this.x_speed = 0;
        this.y_speed = -this.speed;
      } else if (this.angle === 180) {
        this.x_speed = -this.speed;
        this.y_speed = 0;
      } else if (this.angle === 270) {
        this.x_speed = 0;
        this.y_speed = this.speed;
      } else {
        var a = this.angle % 90;
        if (this.angle > 0 && this.angle < 90) {
          this.x_speed = this.speed * Math.cos(a * Math.PI / 180);
          this.y_speed = -this.speed * Math.sin(a * Math.PI / 180);
        } else if (this.angle > 180 && this.angle < 270) {
          this.x_speed = -this.speed * Math.cos(a * Math.PI / 180);
          this.y_speed = this.speed * Math.sin(a * Math.PI / 180);
        } else if (this.angle > 90 && this.angle < 180) {
          this.x_speed = -this.speed * Math.sin(a * Math.PI / 180);
          this.y_speed = -this.speed * Math.cos(a * Math.PI / 180);
        } else if (this.angle > 270 && this.angle < 360) {
          this.x_speed = this.speed * Math.sin(a * Math.PI / 180);
          this.y_speed = this.speed * Math.cos(a * Math.PI / 180);
        }
      }
    }
    this.y += this.y_speed;
    this.x += this.x_speed;
  }
});


Crafty.c('PlayerBullet', {
  init: function() {
    this.requires('Bullet');
    this.attr({
      x_speed: 0,
      y_speed: -25
    })
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
  }
});

Crafty.c('PlayerInitBulletRight', {
  init: function() {
    this.requires('PlayerBullet, bullet3');
  }
});

Crafty.c('Boss1Bullet', {
  init: function() {
    this.requires('Bullet, bullet4');
    this.attr({
      speed: 3
    });
    this.onHit('Player', function(event) {
      var player = event[0].obj;
      this.onHitPlayer(player);
    });
  },

  onHitPlayer: function(player) {
    player.hurt(this.damage);
    this.destroy();
  }
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
    Crafty.audio.play('ex01');
    this.requires("Extreme, SpriteAnimation, spr_boom");
    this.attr({w: 576, h: 768, x: 0, y: 0});
    this.animate('Booom', 0, 0, 1);  // setup
    this.animate('Booom', 5, -1);
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
