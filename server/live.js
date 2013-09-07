
module.exports = function(io) {
  io.sockets.on('connection', function (socket) {
    socket.on('player:ok', function(player) {
      socket.broadcast.emit('player:ok', player)
    })
    socket.on('key', function (e) {
      socket.broadcast.emit('key', e)
    })
    socket.on('tilt', function (e) {
      socket.broadcast.emit('tilt', e)
    })
  })
}