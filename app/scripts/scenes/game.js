Crafty.scene('Game', function(){

  Crafty.background("url(/assets/images/bg/bg-1.png)");
  Crafty.audio.play("bgm", -1, 0.5);

  Crafty.e('Player').fourway(8);

  Crafty.e('Health');
  Crafty.e('SupplyWidget');

  addCannonFodders = function() {
    var u;
    if (Math.random() < 0.02) {
      u = Crafty.e("Goblin");
      u.place(Math.random() * (WINDOW_WIDTH - u.w));
    } else if (Math.random() < 0.005) {
      u = Crafty.e("Slime");
      u.place(Math.random() * (WINDOW_WIDTH - u.w));
    } else if (Math.random() < 0.005) {
      u = Crafty.e("Orc");
      u.place(Math.random() * (WINDOW_WIDTH - u.w));
    } else if (Math.random() < 0.003) {
      u = Crafty.e("BoomFallingSupply");
      u.place(Math.random() * (WINDOW_WIDTH - u.w));
    } else if (Math.random() < 0.001) {
      u = Crafty.e("Boss1");
      u.place(Math.random() * (WINDOW_WIDTH - u.w));
    }
  };

  Crafty.bind("EnterFrame",function(frame){
      //Setup Background position
    Crafty.stage.elem.style.backgroundPosition ="0px " + frame.frame + "px";
    return addCannonFodders.call(this);
  });

  this.bind('KillPlayer', function(){
    Crafty.scene('GameOver');
  });

  Crafty.bind('KeyDown', function(e){
    if(e.key == Crafty.keys['P']){
      Crafty.pause();
    }
  });

  Crafty.bind('KillEnemy', function(e) {
    if(e.explodeEffect) {
      var effect = Crafty.e('2D, Canvas, ' + e.explodeEffect);
      effect.attr({
        x: e.x + e.w / 2 - effect.w / 2, y: e.y + e.h / 2 - effect.h / 2,
      })
      setTimeout(function() {
        effect.destroy()
      }, 500);
    }
  });
});
