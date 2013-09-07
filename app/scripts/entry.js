Game = {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    start: function(){
        Crafty.init(Game.width, Game.height);
        Crafty.canvas.init();
        Crafty.scene('Loading');
    }
}
