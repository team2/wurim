Crafty.scene('GameOver', function(){
  var tpl = _.template('\
      <table class="table">\
        <% _.each(ret, function (item) { %>\
          <li><%= item.attributes.score %> —— <%= item.attributes.p1Name %> <%= item.attributes.p2Name %></li>\
        <% }) %>\
      </table>\
    ')
  Crafty.e('2D, DOM, Image, Keyboard')
    .attr({w: Game.width, h: Game.height})
    .image('/assets/images/gameover.png')
    .bind('KeyDown', function () {
      if (this.isDown('X')) {
        this.destroy()
        Crafty.scene('Game')
      }
    })
    av.getGameScores(function(err, ret) {
      $('#myModal').modal('show')
        .find('.modal-body ol').html(tpl({ret: ret}))
        .end()
        .find('.my-score').text(score.getScore())
    })
})
