Crafty.scene('Game', function(){

  Crafty.background("url(/assets/images/bg/bg-1.png)");

  Crafty.audio.play("boss_background02.mp3",-1, 1.0);


  var p = Crafty.e('Player')

  Crafty.e('Health');

  var addCannonFodders = function() {
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
    } else if (Math.random() < 0.001) {
      u = Crafty.e("Boss1");
      u.place(Math.random() * (WINDOW_WIDTH - u.w));
    }
  };

  Crafty.bind("EnterFrame",function(frame){
      //Setup Background position
    Crafty.stage.elem.style.backgroundPosition ="0px "+frame.frame+"px";
    return addCannonFodders.call(this);
  });
});
