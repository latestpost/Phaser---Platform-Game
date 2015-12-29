var levelOver = function(game){}

levelOver.prototype = {
	init: function(score){

	},
  	create: function(){
                var centerX=this.game.width/2;
                var centerY=this.game.height/2;
                
                var style = {font: "bold 64px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};

                this.title = this.game.add.text(170, 10, "LEVEL COMPLETE", style);
                this.title.x=centerX-this.title.width/2;
                this.title.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
                this.title.fixedToCamera = true;
                
                var stylesmall = {font: "bold 48px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};

                this.score = this.game.add.text(170, 90, 'Score:'+score, stylesmall);
                this.score.x = centerX-this.score.width/2;
                this.score.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
                this.score.fixedToCamera = true;
                
                var percentComplete=(coinsCollected+secretsCollected)/(totalCoins+totalSecrets)*100;
                this.coins = this.game.add.text(170, 150, 'Coins Collected:'+coinsCollected+' of '+totalCoins, stylesmall);
                this.coins.x=centerX-this.coins.width/2;
                this.coins.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
                this.coins.fixedToCamera = true;
                
                this.secrets = this.game.add.text(170, 210, 'Secrets Found:'+secretsCollected+' of '+totalSecrets, stylesmall);
                this.secrets.x=centerX-this.secrets.width/2;
                this.secrets.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
                this.secrets.fixedToCamera = true;
                
                if (percentComplete<33){ // one star
                   var star=this.game.add.sprite(centerX-150,300,"goldstar");
                   star=this.game.add.sprite(centerX-50,300,"greystar");
                   star=this.game.add.sprite(centerX+50,300,"greystar");
                   star=this.game.add.sprite(centerX+150,300,"greystar");
                   
                }
                
                if (percentComplete>33&&percentComplete<66){ // two stars
                    var star=this.game.add.sprite(centerX-150,300,"goldstar");
                   star=this.game.add.sprite(centerX-50,300,"goldstar");
                   star=this.game.add.sprite(centerX+50,300,"greystar");
                   star=this.game.add.sprite(centerX+150,300,"greystar");
                }
                
                if (percentComplete>=66&&percentComplete<99){ // three stars
                    var star=this.game.add.sprite(centerX-150,300,"goldstar");
                   star=this.game.add.sprite(centerX-50,300,"goldstar");
                   star=this.game.add.sprite(centerX+50,300,"goldstar");
                   star=this.game.add.sprite(centerX+150,300,"greystar");
                }
                
                if (percentComplete>=100){ // four stars
                    var star=this.game.add.sprite(centerX-150,300,"goldstar");
                   star=this.game.add.sprite(centerX-50,300,"goldstar");
                   star=this.game.add.sprite(centerX+50,300,"goldstar");
                   star=this.game.add.sprite(centerX+150,300,"goldstar");
                }
                
                var nextButton = this.game.add.button(250,450,"button1",this.showTitle,this);
		nextButton.scale.x=0.4;
                nextButton.scale.y=0.4;
                nextButton.anchor.setTo(0.5,0.5);
                
                var replayButton = this.game.add.button(400,450,"button2",this.playTheGame,this);
		replayButton.scale.x=0.4;
                replayButton.scale.y=0.4;
                replayButton.anchor.setTo(0.5,0.5);
                
                var homeButton = this.game.add.button(550,450,"button3",this.nextLevel,this);
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