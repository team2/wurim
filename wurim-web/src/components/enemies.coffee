Crafty.c "Enemy",
    init: ->
        @requires "2D, Canvas, Collision"
        @origin "center"
        @bind "EnterFrame", @moving

    place: (x) ->
        @attr {x: x, y: -20}

    moving: ->
        @destroy() if @y > WINDOW_HEIGHT
        @y += @speed

    damage: (amount) ->
        Crafty.trigger 'EnemyHit', [@, amount]
        @life -= amount
        @destroy() if @life <= 0

    
Crafty.c "Slime",
    init: ->
        @requires "Enemy, Color"
        @attr {speed: 1, life: 2, w: 30, h: 30}
        @color "#66ccff"
