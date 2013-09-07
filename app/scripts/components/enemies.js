(function() {
  Crafty.c("Enemy", {
    init: function() {
      this.requires("Character");
      this.origin("center");
      this.bind("EnterFrame", this.moving);
      this.bind('Damage', this.damage);
      this.onHit('Bullet', this.onDamage);
    },

    place: function(x) {
      return this.attr({
        x: x,
        y: -20
      });
    },

    moving: function() {
      if (this.y > WINDOW_HEIGHT) {
        this.destroy();
      }
      return this.y += this.speed;
    },

    onDamage: function(event) {
      var bullet = event[0].obj;
      this.trigger('Damage', bullet.damage);
      bullet.destroy();
    },

    damage: function(damage) {
      // Crafty.trigger('EnemyHit', [this, damage]);
      this.hp -= damage;
      if (this.hp <= 0) {
        return this.destroy();
      }
    }
  });

  Crafty.c("Slime", {
    init: function() {
      this.requires("Enemy");
      this.attr({
        hp: 20,
        speed: 1,
        w: 30,
        h: 30
      });
      return this.color("#66ccff");
    }
  });

}).call(this);
