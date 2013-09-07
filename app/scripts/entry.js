Game = {
    width: function(){
        return WINDOW_WIDTH;
    },
    height: function(){
        return WINDOW_HEIGHT;
    },
    start: function(){
        Crafty.init(Game.width(), Game.height());
        Crafty.canvas.init();
        Crafty.scene('Loading');
    }
}
