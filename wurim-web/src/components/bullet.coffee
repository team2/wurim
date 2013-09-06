# player's bullet

Crafty.c "Bullet",
    init: ->
        @requires "2D, Canvas, Collision"
        @attr {w: 5, h: 8}
        @bind 'EnterFrame', @moving
        @onHit 'Enemy', @doDamage

    doDamage: (data) ->
        enemy = data[0].obj
        damage = Math.min enemy.life, @damage
        enemy.damage damage
        @destroy() if damage >= @damage

    moving: ->
        @destroy() if @y < 0
        @y -= @speed
        
    place: (x, y) ->
        @x = x
        @y = y


Crafty.c "BasicBullet",
    init: ->
        @requires "Bullet, Color"
        @attr {damage: 1, speed: 25}
        @color 'rgb(255, 255, 255)'
