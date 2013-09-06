interactions = -> 1
addCannonFodders = ->
    if Math.random() < 0.01
        u = Crafty.e "Slime"
        u.place(Math.random() * WINDOW_WIDTH)
    
Crafty.scene 'game', ->
    Crafty.e('Player').fourway(8)
    @bind "EnterFrame", ->
        interactions.call @
        addCannonFodders.call @
        
, -> 1
