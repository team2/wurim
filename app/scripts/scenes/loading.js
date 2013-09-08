Crafty.scene('Loading', function(){

  Crafty.load([
    "/assets/images/bg/bg-1.png",
    "/assets/images/robot/player.png",
    "/assets/images/welcome.png",
    "/assets/images/ex/ex.png",
    "/assets/images/widgets/health.png",
    "/assets/images/explode/explode-small.png",
    "/assets/images/explode/explode-large.png",
    "/assets/images/explode/explode-3.png",
    "/assets/sounds/alt_attack01.ogg",
    "/assets/sounds/alt_attack02.wav",
    "/assets/sounds/biu.wav",
    "/assets/sounds/tu.wav",
    "/assets/sounds/se_enep00.wav",
    "/assets/sounds/boom.mp3",
    "/assets/sounds/boss_background01.ogg",
    "/assets/sounds/boss_background02.mp3",
    "/assets/sounds/game_over.ogg",
    "/assets/sounds/supply01.mp3",
    "/assets/fonts/8bit.ttf"],

    function(){
      Crafty.audio.add('ah', '/assets/sounds/ah.mp3');
      Crafty.audio.add('biu', '/assets/sounds/biu.wav');
      Crafty.audio.add('tu', '/assets/sounds/tu.wav');
      Crafty.audio.add('ding', '/assets/sounds/ding.mp3');
      Crafty.audio.add("bgm", '/assets/sounds/boss_background02.mp3');
      Crafty.audio.add("hurt", "/assets/sounds/se_invalid.wav");
      Crafty.audio.add("supply01", "/assets/sounds/supply01.mp3");
      Crafty.audio.add("ex01", "/assets/sounds/alt_attack01.ogg");
      Crafty.audio.add("explode", "/assets/sounds/se_enep00.wav");

      Crafty.sprite('/assets/images/widgets/health.png',
        {health: [0, 0, 50, 50]});

      Crafty.sprite('/assets/images/widgets/boom_supply.png',
        {boom_supply: [0, 0, 50, 50]});

      Crafty.sprite('/assets/images/supplies/boom_falling_supply.png',
        {boom_falling_supply: [0, 0, 60, 60]});

      Crafty.sprite('/assets/images/supplies/hp_falling_supply.png',
        {hp_falling_supply: [0, 0, 60, 60]});

      Crafty.sprite('/assets/images/robot/player.png',
        {player: [0, 0, 72, 84]});

      Crafty.sprite('/assets/images/monster/monster-2.png',
        {monster1: [0, 0, 48, 72]});

      Crafty.sprite('/assets/images/monster/monster-5.png',
        {monster2: [0, 0, 36, 36]});

      Crafty.sprite('/assets/images/monster/monster-4.png',
        {monster3: [0, 0, 60, 60]});

      Crafty.sprite('/assets/images/boss/boss1.png',
        {boss1: [0, 0, 365, 240]});

      Crafty.sprite('/assets/images/line13.png',
        {line13: [0, 0, 678, 72]});

      Crafty.sprite(36, 60, '/assets/images/line13_warning.png',
        {spr_line13_warning: [0, 0]});

      Crafty.sprite('/assets/images/bullet/bullet-2.png',
        {bullet2: [0, 0, 12, 36]});

      Crafty.sprite('/assets/images/bullet/bullet-3.png',
        {bullet3: [0, 0, 12, 36]});

      $('.loading-bar .loading').slideUp('slow')
      $('.loading-bar .start').slideDown('slow')

      Crafty.sprite('/assets/images/bullet/bullet-4.png',
        {bullet4: [0, 0, 24, 24]});

      Crafty.sprite('/assets/images/explode/explode-large.png',
        {explodelarge: [0, 0, 120, 108]});

      Crafty.sprite('/assets/images/explode/explode-small.png',
        {explodesmall: [0, 0, 60, 60]});

      Crafty.sprite('/assets/images/explode/explode-3.png',
        {explodeboss: [0, 0, 180, 168]});

      Crafty.sprite(576, 768, '/assets/images/ex/ex.png',
        {spr_boom: [0, 0]});

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
