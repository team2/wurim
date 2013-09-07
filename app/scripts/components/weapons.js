// Base class for all weapons.
// Weapons are divided into two categories: Bullet and Extreme.
Crafty.c('Weapon', {
    init: function() {
        this.requires("2D, Canvas, Collision");
        this.attr({
            damage: 10
        });
    }
});


// Base class for all bullet-like weapons.
Crafty.c('Bullet', {
    init: function() {
        this.requires('Weapon');
        this.attr({
            speed_x: 0,
            speed_y: 25
        });
    };
});


// Base class for all extreme.
Crafty.c('Extreme', {
    init: function() {
        this.requires('Weapon');
    };
});
