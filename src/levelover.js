var levelOver = function(game){}

levelOver.prototype = {
	init: function(score){
		//alert("You scored: "+score)
	},
  	create: function(){
                var centerX=this.game.world.centerX;
                var centerY=this.game.world.centerY;
                
                var nextButton = this.game.add.button(250,300,"button1",this.showTitle,this);
		nextButton.scale.x=0.4;
                nextButton.scale.y=0.4;
                nextButton.anchor.setTo(0.5,0.5);
                
                var replayButton = this.game.add.button(400,300,"button2",this.playTheGame,this);
		replayButton.scale.x=0.4;
                replayButton.scale.y=0.4;
                replayButton.anchor.setTo(0.5,0.5);
                
                var homeButton = this.game.add.button(550,300,"button3",this.nextLevel,this);
		homeButton.scale.x=0.4;
                homeButton.scale.y=0.4;
                homeButton.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
		this.game.state.start("TheGame");
	},
        nextLevel: function(){
                level++;
                leveltext='level'+level;
		this.game.state.start("TheGame");
	},
        showTitle: function(){
		this.game.state.start("GameTitle");
	}
}