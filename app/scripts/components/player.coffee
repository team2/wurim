Crafty.c "Player",
    init: ->
        @requires "2D, Canvas, Color, Collision, Fourway"
        @attr {x: 100, y:100, w:20, h:20}
        @origin "center"
        @color "rgb(255, 0, 0)"
        @bind 'Moved', @stopOnBorder
        @bind 'KeyDown', @fire

    stopOnBorder: ->
        @x = if @x < 0 then 0 else @x
        @x = if @x > WINDOW_WIDTH - @w then WINDOW_WIDTH - @w else @x
        @y = if @y < 0 then 0 else @y
        @y = if @y > WINDOW_HEIGHT - @h then WINDOW_HEIGHT - @h else @y

    fire: (e) ->
        if e.key == Crafty.keys.SPACE
            bullet = Crafty.e 'BasicBullet'
            bullet.place @x + @w / 2, @y
