# player's bullet

Crafty.c "Bullet",
    init: ->
        @requires "2D, Canvas, Color, Collision"
        @attr {w: 5, h: 8}
        @color 'rgb(255, 255, 255)'
        @bind 'EnterFrame', @moving

    moving: ->
        @destroy() if @y < 0
        @y -= 10
        
    place: (x, y) ->
        @x = x
        @y = y
