var gameTitle = function(game){}

gameTitle.prototype = {
  	create: function(){

		var gameTitle = this.game.add.sprite(400,-110,"gametitle");
		gameTitle.anchor.setTo(0.5,0.5);
                this.game.add.tween(gameTitle).to({y:260}, 500, Phaser.Easing.Bounce.Out, true);
                
		var playButton = this.game.add.button(400,420,"play",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
                playButton.y=420;
                
                var game=this.game;
                function pulseOutTween(){
                    playButton.scale.x=0.4;
                    playButton.scale.y=0.4;
                    var pbTween=game.add.tween(playButton.scale).to({ x: 0.5, y: 0.5}, 1000, Phaser.Easing.Bounce.Out, true);
                    pbTween.onComplete.add(pulseInTween, this);
                }
                function pulseInTween(){
                    playButton.scale.x=0.5;
                    playButton.scale.y=0.5;
                    var pbTween=game.add.tween(playButton.scale).to({ x: 0.4, y: 0.4}, 1000, Phaser.Easing.Bounce.Out, true);
                    pbTween.onComplete.add(pulseOutTween, this);
                }
                
                pulseOutTween();
                
                  
                this.game.stage.setBackgroundColor(0x2d2d2d);

	},
	playTheGame: function(){
		this.game.state.start("TheGame");
	}
}