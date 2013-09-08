(function() {
  Crafty.c("Player", {
    init: function() {
      this.requires("2D, Canvas, player, SpriteAnimation, Collision");
      this._speed = { x: 0, y: 0 }
      this._speedA = { x: 0, y: 0 }
      this._speedB = { x: 0, y: 0 }
      this.minSpeed = 1
      this.maxSpeed = 2.5
      this.attr({
        hp: 30,
        x: WINDOW_WIDTH / 2 - 96 / 2,
        y: WINDOW_HEIGHT - 108,
        damage: 10,
        supplies: []
      });
      this.origin("center");
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
      this.reset();
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
    // biu: _.throttle(function() {Crafty.audio.play("biu");}, 1),
    // tu: _.throttle(function() {Crafty.audio.play("tu");}, 1),
    biu: function() {Crafty.audio.play("biu");},
    tu: function() {Crafty.audio.play("tu");},

    fire: function (e) {
      var bullet;
      if (e.key === Crafty.keys.X) {
        // Player A
        bullet = Crafty.e('PlayerInitBulletLeft');
        this.biu();
        bullet.fireAt(this.x, this.y);
      } else if (e.key === Crafty.keys.C) {
        // Player B
        bullet = Crafty.e('PlayerInitBulletRight');
        this.tu()
        bullet.fireAt(this.x + this.w - bullet.w, this.y);
      } else if (
          (e.key === Crafty.keys.F || e.key == Crafty.keys.G) &&
          !this.under_setup) {
        var cd = Crafty.e('BoomCountdown');
        var self = this;
        cd.setKey(e.key == Crafty.keys.F ? Crafty.keys.G : Crafty.keys.F);
        cd.player = this;
        cd.bind('Remove', function() {
          self.under_setup= false
        });
        self.under_setup= true;
      }
    },

    hurt: function(damage) {
      this.hp -= damage;
      Crafty.audio.play("hurt");
      Crafty.trigger('HurtPlayer', this);
      if (this.hp <= 0) {
        Crafty.trigger('KillPlayer', this);
        return this.destroy();
      }
    },

    useSupply: function() {
      s = this.supplies.pop()
      if (s) {
        console.log(s);
        s.doSupply(this);
        s.destroy();
        Crafty.trigger('UseSupply', s);
      }
    },

    collectSupply: function(supply) {
      if (this.supplies.length >= Game.max_supplies) {
        dropedSupply = this.supplies.shift();
        dropedSupply.destroy();
        Crafty.trigger('DropSupply', dropedSupply);
      }
      this.supplies.push(supply);
      Crafty.trigger('CollectSupply', supply);
    }
  });

}).call(this);
