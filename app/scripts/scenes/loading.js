Crafty.scene('Loading', function(){
  Crafty.load([
    "/assets/images/bg/bg-1.png",
    "/assets/images/welcome.png",
    "/assets/images/health/health.png",
    "/assets/sounds/alt_attack01.ogg",
    "/assets/sounds/alt_attack02.wav",
    "/assets/sounds/biubiubiu.wav", 
    "/assets/sounds/boom.mp3",
    "/assets/sounds/boss_background01.ogg",
    "/assets/sounds/boss_background02.mp3",
    "/assets/sounds/game_over.ogg",
    "/assets/sounds/supply.wav"], 

    function(){
      Crafty.audio.add('biu', '/assets/sounds/biubiubiu.wav')
        Crafty.sprite('/assets/images/health/health.png',
          {health: [0, 0, 50, 50]});

        Crafty.e('2D, DOM, Image, Mouse, Keyboard')
          .attr({ w: Game.width, h: Game.height})
          .image('/assets/images/welcome.png')
          .bind('Click', function(){
            console.log('haha');
            Crafty.scene('Game');
            this.destroy();
        }).bind('KeyDown', function(){
            console.log('haha');
            Crafty.scene('Game');
            this.destroy();
        })
    }
  )
})
