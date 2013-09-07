(function() {
  Crafty.c("Player", {
    init: function() {
      this.requires("Character");
      this._speed = { x: 0, y: 0 }
      this._speedA = { x: 0, y: 0 }
      this._speedB = { x: 0, y: 0 }
      this.minSpeed = 2
      this.maxSpeed = 20
      this.attr({
        hp: 30,
        x: WINDOW_WIDTH / 2 - 20,
        y: WINDOW_HEIGHT - 20,
        w: 20,
        h: 20,
        damage: 10
      });
      this.origin("center");
      this.color("rgb(255, 0, 0)");
      this.bind('EnterFrame', this.moving);
      this.bind('KeyDown', this.fire);
      this.bind('tilt', function (data){
        var co = 0.2
        if (data.isA) {
          this._speedA = {x: data.tiltLR * co , y: data.tiltFB * co}
        } else {
          this._speedB = {x: data.tiltLR * co, y: data.tiltFB * co}
        }
        this.setSpeed()
      });
    },

    moving: function () {
      this.y += this._speed.y
      this.x += this._speed.x
      this.x = this.x < 0 ? 0 : this.x;
      this.x = this.x > WINDOW_WIDTH - this.w ? WINDOW_WIDTH - this.w : this.x;
      this.y = this.y < 0 ? 0 : this.y;
      this.y = this.y > WINDOW_HEIGHT - this.h ? WINDOW_HEIGHT - this.h : this.y;
      return this
    },
    setSpeed: function () {
      function bound(val, min, max) {
        if (-min / 2 < val && val < min / 2 ) {
          return 0
        } else if (val < -max) {
          return -max
        } else if (val > max) {
          return max
        } else {
          return val
        }
      }

      this._speedA.x = bound(this._speedA.x, this.minSpeed, this.maxSpeed)
      this._speedB.x = bound(this._speedB.x, this.minSpeed, this.maxSpeed)
      this._speedA.y = bound(this._speedA.y, this.minSpeed, this.maxSpeed)
      this._speedB.y = bound(this._speedB.y, this.minSpeed, this.maxSpeed)
      this._speed.x = this._speedA.x + this._speedB.x
      this._speed.y = this._speedA.y + this._speedB.y
    },
    fire: function(e) {
      var bullet;
      if (e.key === Crafty.keys.X) {
        // Player A
        bullet = Crafty.e('PlayerInitBullet');
        Crafty.audio.play('biu');
        bullet.fireAt(this.x, this.y);
      } else if (e.key === Crafty.keys.C) {
        // Player B
        bullet = Crafty.e('PlayerInitBullet');
        Crafty.audio.play('biu');
        bullet.fireAt(this.x + this.w - bullet.w, this.y);
      } else if (
          (e.key === Crafty.keys.F || e.key == Crafty.keys.G) &&
          !this.in_boom) {
        var cd = Crafty.e('BoomCountdown');
        var self = this;
        cd.setKey(e.key == Crafty.keys.F ? Crafty.keys.G : Crafty.keys.F);
        cd.bind('Remove', function() {
          console.log('!!!');
          self.in_boom = false
        });
        self.in_boom = true;
      }
    },

    hurt: function(damage) {
      this.hp -= damage;
      Crafty.trigger('HurtPlayer', this);
      if (this.hp <= 0) {
        Crafty.trigger('KillPlayer', this);
        return this.destroy();
      }
    },
  });

}).call(this);
