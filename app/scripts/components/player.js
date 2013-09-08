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
        w: 72,
        h: 84,
        damage: 10,
        supplies: []
      });
      this.collision(
        new Crafty.polygon([0, 0], [0, 84], [72, 0], [72, 84]));
      this.origin("center");
      this.bind('EnterFrame', this.moving);
      this.bind('KeyDown', this.fire);
      this.bind('tilt', function (data){
        var co = 0.2
        if (data.isA) {
          this._speedA = {y: -data.tiltLR * co , x: data.tiltFB * co}
        } else {
          this._speedB = {y: -data.tiltLR * co, x: data.tiltFB * co}
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
        var supply = this.popSupply();
        if(supply) {
          var cd = Crafty.e('BoomCountdown');
          var self = this;
          cd.setKey(e.key == Crafty.keys.F ? Crafty.keys.G : Crafty.keys.F);
          cd.player = this;
          cd.supply = supply;
          cd.bind('Remove', function() {
            self.under_setup = false
          });
          self.under_setup = true;
        }
      }
    },

    hurt: _.throttle(function(damage) {this._hurt(damage);}, 1000),

    _hurt: function(damage) {
      this.hp -= damage;
        Crafty.audio.play("hurt");
      Crafty.trigger('HurtPlayer', this);
      if (this.hp <= 0) {
        Crafty.audio.play("ah");
        Crafty.trigger('KillPlayer', this);
        return this.destroy();
      }
    },

    heal: function(value) {
      var tmp_hp = this.hp + value;
      this.hp = tmp_hp < Game.max_hp ? tmp_hp : Game.max_hp;
      Crafty.trigger('HealPlayer', this);
    },

    useSupply: function(s) {
      if (s) {
        s.doSupply(this);
        Crafty.trigger('UseSupply', s);
      }
    },

    popSupply: function() {
      s = this.supplies.pop();
      s && s.destroy();
      return s;
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
