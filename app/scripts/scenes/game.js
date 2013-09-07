Crafty.scene('Game', function(){

  Crafty.background("url(/assets/images/bg/bg-1.png)");

  Crafty.audio.play("boss_background02.mp3",-1, 1.0);

  Crafty.bind("EnterFrame",function(frame){
      //Setup Background position
    Crafty.stage.elem.style.backgroundPosition ="0px "+frame.frame+"px";
    return addCannonFodders.call(this);
  });

  Crafty.e('Player').fourway(8);
  Crafty.e('Health').at(5, 5);
  Crafty.e('Health').at(45, 5);
  Crafty.e('Health').at(85, 5);

  addCannonFodders = function() {
    var u;
    if (Math.random() < 0.01) {
      u = Crafty.e("Slime");
      return u.place(Math.random() * (WINDOW_WIDTH - u.w));
    }
  };
});
