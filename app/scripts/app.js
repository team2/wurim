(function () {

  app.players = {
    a: false,
    b: false,
  }
  app.ensureGame = function () {
    if (app.players.a && app.players.b) {
      app.startGame()
    }
  }

  var socket = io.connect('http://wurim.thbattle.net:9001');
  socket.on('player:ok', function (player) {
    $('.player-' + player).html('玩家' + player + '已连接！' )
    app.players[player] = true
    app.ensureGame()
  });

  function emit (e) {
    if (e.type === 'keydown') {
      if (Crafty.keydown[e.key] !== true) {
        Crafty.keydown[e.key] = true;
        console.log('KeyDown', e)
        Crafty.trigger('KeyDown', e);
      }
    } else if (e.type === 'keyup') {
      if (Crafty.keydown[e.key] === true) {
        delete Crafty.keydown[e.key];
        Crafty.trigger('KeyUp', e);
        console.log('KeyUp', e)
      }
    }
  }
  socket.on('key', function (e) {
    emit(e)
  })

})()