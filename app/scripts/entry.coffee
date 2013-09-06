window.onload = ->
    Crafty.mobile = false
    Crafty.init WINDOW_WIDTH, WINDOW_HEIGHT
    Crafty.canvas.init()
    Crafty.background 'black'
    Crafty.scene 'game'
