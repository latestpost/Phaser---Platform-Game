var levelSelector = function(game){}

levelSelector.prototype = {
	init: function(score){
		//alert("You scored: "+score)
	},
  	create: function(){
                var centerX=this.game.world.centerX;
                var centerY=this.game.world.centerY;
                
                var style = {font: "bold 64px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};

                this.title = this.game.add.text(170, 10, "SELECT LEVEL", style);
                this.title.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
                this.title.fixedToCamera = true;
                
                var nextButton = this.game.add.button(70,70,"button1",this.showTitle,this);
		nextButton.scale.x=0.4;
                nextButton.scale.y=0.4;
                nextButton.anchor.setTo(0.5,0.5);

                //** TODO persist levels complete
                levelsComplete=11;
 
                var buttonStyle = {
                    'font': '48px Arial',
                    'fill': 'black'
                };
    
                var buttons={};
                var counter=1;
                var offset=0;
                for (y=0;y<4;y++){
                    for (x=0;x<4;x++){
                        if (counter>9){offset=-18;}
                        if (counter<levelsComplete){
                            buttons[counter]=this.game.add.button(240+x*110,160+y*110,"buttonblank",this.playLevel,this);   
                        }
                        else
                        {
                            buttons[counter]=this.game.add.button(240+x*110,160+y*110,"buttonblankdisabled",this.noLevel,this);
                        }
                        this.game.add.text(228+offset+x*110,136+y*110, ''+counter, buttonStyle);
                        buttons[counter].scale.x=0.4;
                        buttons[counter].scale.y=0.4;
                        buttons[counter].id=counter;
                        buttons[counter].anchor.setTo(0.5,0.5);
                        counter++;
                    }
                }
	},
	playTheGame: function(){
		this.game.state.start("TheGame");
	},
        noLevel: function(){
		
	},
        playLevel: function(button){
                level=button.id;
                leveltext='level'+level;
		this.game.state.start("TheGame");
	},
        showTitle: function(){
		this.game.state.start("GameTitle");
	}
}