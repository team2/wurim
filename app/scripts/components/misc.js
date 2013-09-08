(function() {
  Crafty.c('BoomCountdown', {
    init: function() {
      this.requires("2D, Color, Canvas");
      this.attr({x: 0, y: WINDOW_HEIGHT - 5, w: WINDOW_WIDTH, h: 5})
      this.percentage = 1.0;
      this.color('#66ccff');
      this.bind('EnterFrame', this.countdown);
      this.bind('KeyDown', this.keydown);
    },
    setKey: function(key) {
      this.key = key;
    },
    countdown: function() {
      this.percentage -= 0.03;
      if(this.percentage <= 0) {
        this.destroy();
      }
      this.w = WINDOW_WIDTH * this.percentage;
    },
    keydown: function(e) {
      if(e.key == this.key) {
        this.player.useSupply(this.supply);
        this.destroy();
      }
    },
  });

  Crafty.c("ScoreText", {
    init: function() {
      that = this;
      this.requires("2D, DOM, Text");
      this.attr({
        x: 220,
        y: 12,
        w: 160,
        h: 20,
        score: -99999999
      });
      this.unselectable();
      this.textColor('white');
      this.textFont("size", "30px");
      // this.textFont("family", "8bit.ttf");
      this.css("style", "font-family:8BIT WONDER");
      this.updateScore()
      this.bind("KillEnemy", function(u) {
        if (u.__c.Goblin) {
          that.score += 32000;
        } else if (u.__c.Slime) {
          that.score += 64000;
        } else if (u.__c.Orc) {
          that.score += 128000;
        } else if (u.__c.Boss1) {
          this.score += 1024000;
        }
        that.updateScore();
      })
    },
    updateScore: function() {
      scoreStr = "" + this.score;
      scoreStr = new Array(8 - scoreStr.length + 1).join("0") + scoreStr;
      this.text(scoreStr);
    }
  });
}).call(this);
