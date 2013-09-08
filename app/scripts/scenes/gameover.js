Crafty.scene('GameOver', function(){
  Crafty.e('2D, DOM, Image, Keyboard')
    .attr({w: Game.width, h: Game.height})
    .image('/assets/images/gameover.png')
    .bind('KeyDown', function () {
      if (this.isDown('X')) {
        this.destroy()
        Crafty.scene('Game')
      }
    })


})
