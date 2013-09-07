Crafty.scene('Loading', function(){
    Crafty.e('2D, DOM, Text')
        .text('Loading...')
        .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width()})

    Crafty.load([
        "/assets/images/bg/bg-1.png",
        "/assets/images/health/health.png",
        "/assets/sounds/alt_attack01.ogg",
        "/assets/sounds/alt_attack02.wav",
        "/assets/sounds/boom.mp3",
        "/assets/sounds/boss_background01.ogg",
        "/assets/sounds/boss_background02.mp3",
        "/assets/sounds/game_over.ogg",
        "/assets/sounds/supply.wav"], 
        function(){
            Crafty.sprite('/assets/images/health/health.png',
                {health: [0, 0, 50, 50]});
            Crafty.scene('Game');
        }
    )

    Crafty.audio.add('biu', '/assets/sounds/biubiubiu.wav')
})
