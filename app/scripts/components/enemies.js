(function() {
  Crafty.c("Enemy", {
    init: function() {
      this.requires("Character");
      this.attr({
        damage: 10
      });
      this.origin("center");
      this.bind("EnterFrame", this.moving);
      this.bind('HurtEnemy', this.hurt);
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

    hurt: function(damage) {
      this.hp -= damage;
      if (this.hp <= 0) {
        this.trigger('KillEnemy');
        return this.destroy();
      }
    },

    onDamage: function(event) {
      var bullet = event[0].obj;
      this.trigger('HurtEnemy', bullet.damage);
      bullet.destroy();
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
