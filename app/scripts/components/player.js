(function() {
  Crafty.c("Player", {
    init: function() {
      this.requires("Character, Fourway");
      this.attr({
        hp: 30,
        x: 100,
        y: 100,
        w: 20,
        h: 20
      });
      this.origin("center");
      this.color("rgb(255, 0, 0)");
      this.bind('Moved', this.stopOnBorder);
      this.bind('KeyDown', this.fire);
      this.bind('HurtPlayer', this.damage);
      this.onHit('Enemy', this.onDamage);
    },

    stopOnBorder: function() {
      this.x = this.x < 0 ? 0 : this.x;
      this.x = this.x > WINDOW_WIDTH - this.w ? WINDOW_WIDTH - this.w : this.x;
      this.y = this.y < 0 ? 0 : this.y;
      return this.y = this.y > WINDOW_HEIGHT - this.h ? WINDOW_HEIGHT - this.h : this.y;
    },

    fire: function(e) {
      var bullet;
      if (e.key === Crafty.keys.X) {
        // Player A
        bullet = Crafty.e('PlayerInitBullet');
        return bullet.place(this.x, this.y);
      } else if (e.key === Crafty.keys.C) {
        // Player B
        bullet = Crafty.e('PlayerInitBullet');
        return bullet.place(this.x + this.w - bullet.w, this.y);
      }
    },

    damage: function(damage) {
      this.hp -= damage;
      if (this.hp <= 0) {
        this.trigger('KillPlayer');
        return this.destroy();
      }
    },

    onDamage: function(event) {
      var enemy = event[0].obj;
      this.trigger('HurtPlayer', enemy.damage);
      enemy.destroy();
    }
  });

}).call(this);
