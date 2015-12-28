var gameOver = function(game){}

gameOver.prototype = {
	init: function(score){
		//alert("You scored: "+score)
	},
  	create: function(){
                var centerX=this.game.world.centerX;
                var centerY=this.game.world.centerY;
                
                
  		var gameOverTitle = this.game.add.sprite(400,300,"gameover");
		gameOverTitle.anchor.setTo(0.5,0.5);
		var playButton = this.game.add.button(400,300,"play",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
		this.game.state.start("TheGame");
	}
}