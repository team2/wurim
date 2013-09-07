(function() {
  var addCannonFodders, interactions;

  interactions = function() {
    return 1;
  };

  addCannonFodders = function() {
    var u;
    if (Math.random() < 0.01) {
      u = Crafty.e("Slime");
      return u.place(Math.random() * WINDOW_WIDTH);
    }
  };

  Crafty.scene('game', function() {
    Crafty.e('Player').fourway(8);
    return this.bind("EnterFrame", function() {
      interactions.call(this);
      return addCannonFodders.call(this);
    });
  }, function() {
    return 1;
  });

}).call(this);
