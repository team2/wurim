(function() {
  Crafty.c("Enemy", {
    init: function() {
      this.requires("Character");
      this.attr({
        damage: 10
      });
      this.origin("center");
      this.bind("EnterFrame", this.moving);
      this.onHit('Player', this.onHitPlayer)
    },

    place: function(x) {
      return this.attr({
        x: x,
        y: -20
      });
    },

    hurt: function(damage) {
      Crafty.trigger('HurtEnemy', this);
      this.hp -= damage;
      if (this.hp <= 0) {
        Crafty.trigger('KillEnemy', this);
        this.destroy();
      }
    },

    onHitPlayer: function(event) {
      var player = event[0].obj;
      player.hurt(this.damage);
      this.hurt(player.damage);
    }
  });

  Crafty.c("Goblin", {
    init: function() {
      this.requires("Enemy");
      this.attr({
        hp: 10,
        speed: 3,
        w: 30,
        h: 30
      });
      return this.color("#66ccff");
    },

    moving: function() {
      if (this.y > WINDOW_HEIGHT) {
        this.destroy();
      }
      return this.y += this.speed;
    }
  });

  Crafty.c("Slime", {
    init: function() {
      this.requires("Enemy");
      this.attr({
        hp: 10,
        speed: 2,
        w: 50,
        h: 50
      });
      return this.color('#324311');
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
        Crafty.trigger('KillEnemy');
        this.destroy();
      }
    }
  });

  Crafty.c("Orc", {
    init: function() {
      this.requires("Enemy");
      this.attr({
        hp: 100,
        speed: 2,
        w: 50,
        h: 50
      });
      return this.color('#224991');
    },

    moving: function() {
      if (this.y > WINDOW_HEIGHT) {
        this.destroy();
      }
      return this.y += this.speed;
    }
  });

  Crafty.c("Boss1", {
    init: function() {
      this.requires("Enemy");
      this.attr({
        hp: 2500,
        speed: 1,
        w: 100,
        h: 100
      });
      return this.color("#66ccff");
    },

    moving: function() {
      if (this.y > WINDOW_HEIGHT) {
        this.destroy();
      }
      return this.y += this.speed;
    }
  });

}).call(this);
