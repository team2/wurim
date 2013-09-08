Crafty.scene('Loading', function(){

  Crafty.load([
    "/assets/images/bg/bg-1.png",
    "/assets/images/robot/player.png",
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
      Crafty.audio.add("biu", '/assets/sounds/g_biu.m4a');
      Crafty.audio.add("tu", '/assets/sounds/g_tu.m4a');
      Crafty.audio.add("bgm", '/assets/sounds/boss_background02.mp3');
      Crafty.audio.add("hurt", "/assets/sounds/se_invalid.wav");

      Crafty.sprite('/assets/images/health/health.png',
        {health: [0, 0, 50, 50]});

      Crafty.sprite('/assets/images/robot/player.png',
        {player: [0, 0, 96, 108]});

      Crafty.sprite('/assets/images/monster/monster-2.png',
        {monster1: [0, 0, 48, 72]});

      Crafty.sprite('/assets/images/monster/monster-5.png',
        {monster2: [0, 0, 36, 36]});

      Crafty.sprite('/assets/images/monster/monster-4.png',
        {monster3: [0, 0, 60, 60]});

      Crafty.sprite('/assets/images/boss/boss1.png',
        {boss1: [0, 0, 365, 240]});

      Crafty.sprite('/assets/images/bullet/bullet-2.png',
        {bullet2: [0, 0, 12, 36]});

      Crafty.sprite('/assets/images/bullet/bullet-3.png',
        {bullet3: [0, 0, 12, 36]});

      $('.loading-bar .loading').slideUp('slow')
      $('.loading-bar .start').slideDown('slow')

      Crafty.e('Mouse, Keyboard')
        .bind('Click', function(){
          Crafty.scene('Game');
          this.destroy();
      }).bind('KeyDown', function(){
          Crafty.scene('Game');
          this.destroy();
      });
    }
  )
})
