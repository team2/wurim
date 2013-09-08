Crafty.c('Health', {
  _padding: 5,
  _margin: 40,
  default_health: 3,
  init: function() {
    this.healths = [];
    for(var i = 0; i != this.default_health; ++i){
      this.healths.push(Crafty.e('Actor, health').at(this._padding + i * this._margin, this._padding));
    }
    this._health_cursor = this.default_health - 1;
    this.bind('HealPlayer', function(){
      if(this._health_cursor == this.default_health - 1){
        return
      }
      this.healths[this._health_cursor++].visible = true;
    });
    this.bind('HurtPlayer', function(){
      if(this._health_cursor == -1){
        return;
      }else{
        this.healths[this._health_cursor--].visible = false;
      }
    })
  }
});


Crafty.c('SupplyWidget', {
  _padding: 5,
  _margin: 40,
  init: function() {
    this.supplies = []

    this.bind('CollectSupply', function(supply) {
      supply.at(Game.width - this._padding - (this.supplies.length + 1) * this._margin, this._padding)
      this.supplies.push(supply)
    });
    this.bind('UseSupply', function(supply) {
      this.supplies.pop();
    });
    this.bind('DropSupply', function(supply) {
      for (var i = 1; i < this.supplies.length; i++) {
        this.supplies[i].at(Game.width - this._padding - i * this._margin, this._padding);
      }
      this.supplies.shift();
    });
  }
});
