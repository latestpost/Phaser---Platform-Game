<!doctype html>
<html>
	<head>
    		<script src="phaser-min-old.js"></script>
    		<script src="src/boot.js"></script>
		<script src="src/preload.js"></script>
		<script src="src/gametitle.js"></script>
                <script src="src/gameObjects.js"></script>
		<script src="src/thegame.js"></script>
		<script src="src/gameover.js"></script>
                <script src="src/levelover.js"></script>
                <script src="src/levelSelector.js"></script>
                <script src="src/particleFX.js"></script>	
    		<style>
    			body{margin:0}
    		</style>
		<script>
			(function() {
				var game = new Phaser.Game(800, 600, Phaser.CANVAS, "game");
				game.state.add("Boot",boot);
				game.state.add("Preload",preload);
				game.state.add("GameTitle",gameTitle);
				game.state.add("TheGame",theGame);
				game.state.add("GameOver",gameOver);
                                game.state.add("LevelOver",levelOver);
                                game.state.add("LevelSelector",levelSelector);
				game.state.start("Boot");
			})();    
		</script>
    </head>
    <body>
    </body>
</html>