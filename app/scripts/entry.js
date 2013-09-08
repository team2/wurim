Game = {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    max_supplies: 3,
    start: function(){
        Crafty.init(Game.width, Game.height);
        Crafty.canvas.init();
        Crafty.scene('Loading');
    }
}
