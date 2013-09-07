(function() {
  Crafty.c("Enemy", {
    init: function() {
      this.requires("2D, Canvas, Collision");
      this.origin("center");
      return this.bind("EnterFrame", this.moving);
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
    damage: function(amount) {
      Crafty.trigger('EnemyHit', [this, amount]);
      this.life -= amount;
      if (this.life <= 0) {
        return this.destroy();
      }
    }
  });

  Crafty.c("Slime", {
    init: function() {
      this.requires("Enemy, Color");
      this.attr({
        speed: 1,
        life: 2,
        w: 30,
        h: 30
      });
      return this.color("#66ccff");
    }
  });

}).call(this);
