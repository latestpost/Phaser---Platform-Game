var gameTitle = function(game){}

gameTitle.prototype = {
  	create: function(){
		var gameTitle = this.game.add.sprite(400,-110,"gametitle");
		gameTitle.anchor.setTo(0.5,0.5);
                //gameTitle.alpha=0;
                //this.game.add.tween(gameTitle).to({alpha: 1}, 2500, Phaser.Easing.Linear.None, true);
                this.game.add.tween(gameTitle).to({y:260}, 500, Phaser.Easing.Bounce.Out, true);
                
		var playButton = this.game.add.button(400,420,"play",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
                //playButton.alpha=0;
                playButton.y=420;
                
                //this.game.add.tween(playButton).to( { y: 420 }, 2000, Phaser.Easing.Bounce.Out, true);
                //var playButtonTween=this.game.add.tween(playButton).to({alpha: 1}, 1500, Phaser.Easing.Linear.None, true);
                
                var game=this.game;
                function pulseOutTween(){
                    playButton.scale.x=1;
                    playButton.scale.y=1;
                    var pbTween=game.add.tween(playButton.scale).to({ x: 1.2, y: 1.2}, 1000, Phaser.Easing.Bounce.Out, true);
                    pbTween.onComplete.add(pulseInTween, this);
                }
                function pulseInTween(){
                    playButton.scale.x=1.2;
                    playButton.scale.y=1.2;
                    var pbTween=game.add.tween(playButton.scale).to({ x: 1, y: 1}, 1000, Phaser.Easing.Bounce.Out, true);
                    pbTween.onComplete.add(pulseOutTween, this);
                }
                
                pulseOutTween();
                
                  
                this.game.stage.setBackgroundColor(0x2d2d2d);

	},
	playTheGame: function(){
		this.game.state.start("TheGame");
	}
}