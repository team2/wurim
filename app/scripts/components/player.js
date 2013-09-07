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
      return this.bind('KeyDown', this.fire);
    },

    stopOnBorder: function() {
      this.x = this.x < 0 ? 0 : this.x;
      this.x = this.x > WINDOW_WIDTH - this.w ? WINDOW_WIDTH - this.w : this.x;
      this.y = this.y < 0 ? 0 : this.y;
      return this.y = this.y > WINDOW_HEIGHT - this.h ? WINDOW_HEIGHT - this.h : this.y;
    },

    fire: function(e) {
      var bullet;
      if (e.key === Crafty.keys.SPACE) {
        bullet = Crafty.e('PlayerInitBullet');
        return bullet.place(this.x + this.w / 2, this.y);
      }
    }
  });

}).call(this);
