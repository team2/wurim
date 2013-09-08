(function() {
  Crafty.c("Enemy", {
    init: function() {
      this.requires("2D, Canvas, Collision");
      this.attr({
        damage: 10
      });
      this.origin("center");
      this.bind("EnterFrame", this.moving);
      this.onHit('Player', function(event) {
        var player = event[0].obj;
        this.onHitPlayer(player);
      })
    },

    place: function(x) {
      return this.attr({
        x: x,
        y: -100
      });
    },

    hurt: function(damage) {
      Crafty.trigger('HurtEnemy', this);
      this.hp -= damage;
      if (this.hp <= 0) {
        Crafty.trigger('KillEnemy', this);
        this.beforeDestory();
        this.destroy();
      }
    },

    onHitPlayer: function(player) {
      player.hurt(this.damage);
      this.hurt(player.damage);
    }
  });

  Crafty.c("Goblin", {
    init: function() {
      this.requires("Enemy, monster2");
      this.attr({
        direction: 0,
        hp: 10,
        speed: 3,
        w: 30,
        h: 30
      });
      return this
    },

    beforeDestory: function() {
    },

    moving: function() {
      if (this.y > WINDOW_HEIGHT) {
        this.destroy();
      }
      if (this.direction === 0) {
        this.y += this.speed;
      } else {
        this.y += this.speed * 0.8;
        this.x += this.speed * this.direction * 0.3;
      }
    }
  });

  Crafty.c("Slime", {
    init: function() {
      this.requires("Enemy, monster1");
      this.attr({
        hp: 30,
        speed: 2,
        w: 48,
        h: 72
      });
      return this
    },

    moving: function() {
      if (this.y > WINDOW_HEIGHT) {
        this.destroy();
      }
      return this.y += this.speed;
    },
    
    beforeDestory: function() {
      for (var i=-1; i<=1; i++) {
        var u = Crafty.e("Goblin");
        u.direction = i;
        u.x = this.x;
        u.y = this.y;
      }
    }
  });

  Crafty.c("Orc", {
    init: function() {
      this.requires("Enemy, monster3");
      this.attr({
        hp: 90,
        speed: 2,
        w: 50,
        h: 50
      });
      return this;
    },

    beforeDestory: function() {
    },
    
    moving: function() {
      if (this.y > WINDOW_HEIGHT) {
        this.destroy();
      }
      return this.y += this.speed;
    }
  });

  Crafty.c("Train", {
    init: function() {
        this.requires("Enemy, monster3");
        this.attr({
          hp: +Infinity,
          speed: 10,
          w: 1000,
          h: 40
        });
    },

    beforeDestory: function() {},

    moving: function() {
        return this.x += this.speed; 
    }
  });

  Crafty.c("Boss1", {
    init: function() {
      this.requires("Enemy, boss1");
      this.attr({
        hp: 2500,
        x_speed: 1,
        y_speed: 1,
        w: 365,
        h: 240
      });
      return this;
    },
    
    beforeDestory: function() {
    },

    moving: function() {
      if ((this.x < 0 && this.x_speed < 0) || (this.x >= WINDOW_WIDTH - this.w && this.x_speed > 0)) {
        this.x_speed = -this.x_speed;
      }
      if ((this.y < 0 && this.y_speed < 0) || (this.y >= WINDOW_HEIGHT - this.h * 4 && this.y_speed > 0)) {
        this.y_speed = -this.y_speed;
      }
      this.x += this.x_speed;
      this.y += this.y_speed;
    }
  });

}).call(this);
