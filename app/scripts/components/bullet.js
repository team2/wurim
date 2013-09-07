(function() {
  Crafty.c("Bullet", {
    init: function() {
      this.requires("2D, Canvas, Collision");
      this.attr({
        w: 5,
        h: 8
      });
      this.bind('EnterFrame', this.moving);
    },

    // doDamage: function(data) {
    //   var damage, enemy;
    //   enemy = data[0].obj;
    //   damage = Math.min(enemy.life, this.damage);
    //   enemy.damage(damage);
    //   if (damage >= this.damage) {
    //     return this.destroy();
    //   }
    // },

    moving: function() {
      if (this.y < 0) {
        this.destroy();
      }
      return this.y -= this.speed;
    },

    place: function(x, y) {
      this.x = x;
      return this.y = y;
    }
  });

  Crafty.c("BasicBullet", {
    init: function() {
      this.requires("Bullet, Color");
      this.attr({
        damage: 10,
        speed: 25
      });
      return this.color('rgb(255, 255, 255)');
    }
  });

}).call(this);
