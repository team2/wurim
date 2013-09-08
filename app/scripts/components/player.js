(function() {
  Crafty.c("Player", {
    init: function() {
      this.requires("2D, Canvas, player, Fourway, SpriteAnimation, Collision");
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
      this.bind('Moved', this.stopOnBorder);
      this.bind('KeyDown', this.fire);
      this.reset();
      console.log(this.w)
    },

    stopOnBorder: function() {
      this.x = this.x < 0 ? 0 : this.x;
      this.x = this.x > WINDOW_WIDTH - this.w ? WINDOW_WIDTH - this.w : this.x;
      this.y = this.y < 0 ? 0 : this.y;
      return this.y = this.y > WINDOW_HEIGHT - this.h ? WINDOW_HEIGHT - this.h : this.y;
    },

    // biu: _.throttle(function() {Crafty.audio.play("biu");}, 1),
    // tu: _.throttle(function() {Crafty.audio.play("tu");}, 1),
    biu: function() {Crafty.audio.play("biu");},
    tu: function() {Crafty.audio.play("tu");},

    fire: function(e) {
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
