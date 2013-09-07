$(function () {
  var isA = (location.hash.slice(1) === 'a')
  FastClick.attach(document.body)
  var socket = io.connect('http://wurim.thbattle.net:9001');
  socket.on('connect', function () {
    socket.emit('player:ok', location.hash.slice(1))
  })


  $('.xBtn').on('click', function () {
    if (isA) {
      socket.emit('key', { type: 'keydown', key: Crafty.keys.X })
    } else {
      socket.emit('key', { type: 'keydown', key: Crafty.keys.C })
    }
  })
  $('.oBtn').on('click', function () {
    if (isA) {
      socket.emit('key', { type: 'keydown', key: Crafty.keys.X })
      socket.emit('key', { type: 'keyup', key: Crafty.keys.X })
    } else {
      socket.emit('key', { type: 'keydown', key: Crafty.keys.C })
      socket.emit('key', { type: 'keyup', key: Crafty.keys.C })
    }
  })
  document.ontouchstart = function (e) {
    e.preventDefault();
  }


  Crafty.device.deviceOrientation(function(data){
    data.isA = isA
    socket.emit('tilt', data)
  });

  // function emit (type, key) {
  //   var e = {}
  //   e.type = type
  //   e.key = key
  //   if (e.type === 'keydown') {
  //     if (Crafty.keydown[e.key] !== true) {
  //       Crafty.keydown[e.key] = true;
  //       socket.emit('key', e);
  //     }
  //   } else if (e.type === 'keyup') {
  //     if (Crafty.keydown[e.key] === true) {
  //       delete Crafty.keydown[e.key];
  //       socket.emit('key', e);
  //     }
  //   }
  // }

  // window.addEventListener('deviceorientation', function(e) {
  //   var sensitivity = 10
  //   if (e.gamma < -sensitivity) {
  //     emit('keydown', Crafty.keys.DOWN_ARROW)
  //   } else if (e.gamma > -sensitivity && e.gamma < 0) {
  //     emit('keyup', Crafty.keys.DOWN_ARROW)
  //   } else if (e.gamma > sensitivity) {
  //     emit('keydown', Crafty.keys.UP_ARROW)
  //   } else if (e.gamma < sensitivity && e.gamma > 0) {
  //     emit('keyup', Crafty.keys.UP_ARROW)
  //   }
  //   if (e.beta < -sensitivity) {
  //     emit('keydown', Crafty.keys.LEFT_ARROW)
  //   } else if (e.beta > -sensitivity && e.beta < 0) {
  //     emit('keyup', Crafty.keys.LEFT_ARROW)
  //   } else if (e.beta > sensitivity) {
  //     emit('keydown', Crafty.keys.RIGHT_ARROW)
  //   } else if (e.beta < sensitivity && e.beta > 0) {
  //     emit('keyup', Crafty.keys.RIGHT_ARROW)
  //   }
  // }, true)
})