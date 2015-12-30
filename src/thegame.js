/*TODO
teleportation tile

 */
//some global vars 
var fireballs;
var fireRate = 300;
var nextFire = 0;
var nextJump = 0;
var player;
var left = false;
var right = false;
var duck = false;
var fire = false;
var jump = false;
var isGrounded = false;
var map;
var layer;
var land, land2, land3;
var score = 0;
var coinsCollected = 0;
var totalCoins = 0;
var secretsCollected = 0;
var totalSecrets = 0;
var cursors;
var mapbody;
var emitter;
var enemies;
var enemiesTotal = 50;
var playerDead = false;

var hud1, hud2, hud3, hud4, hud5;

var coins = 5;
var TILE_SIZE = 72;

var playerCollisionGroup;
var tileCollisionGroup;
var enemyCollisionGroup;
var useVirtualJoystick = false;
var Animator = [];

var theGame = function (game) {

};

theGame.prototype = {
    fireballHit: function (body, bodyB, shapeA, shapeB, equation) {

        if (typeof equation === 'undefined' || equation.length == 0)
        {
            //console.log('no equation');
            return false;
        }
        console.log('fireball hit!');
        
        var index = 0;
        try {
            index = equation[0].bodyB.parent.tile.index;
        }
        catch (e)
        {
            index = 0;
        }

        if (index == 0) {
            try {
                index = equation[0].bodyA.parent.tile.index;
            }
            catch (e)
            {
                index = 0;
            }
        }

        if (index)
        {
            console.log("Fireball hit Tile "+index);
            if (index == 46) { // crate

                if (Math.floor((Math.random() * 10) + 1)>8) { // randomly get coin
                    score = score + 50;
                    this.scoreShow.setText(score);
                    coinUp(body.tile.x * TILE_SIZE + TILE_SIZE / 2, body.tile.y * TILE_SIZE + TILE_SIZE / 2, this.game);
                }

                this.breakblockSnd.play();
                explodeSmoke(body.tile.x * TILE_SIZE + TILE_SIZE / 2, body.tile.y * TILE_SIZE + TILE_SIZE / 2, this.game, index - 1);
                explodeWood(body.tile.x * TILE_SIZE + TILE_SIZE / 2, body.tile.y * TILE_SIZE + TILE_SIZE / 2, this.game, '', emitter9);
                this.game.physics.p2.removeBody(body);
                map.removeTile(body.tile.x, body.tile.y);

                equation[0].bodyA.parent.sprite.destroy();
            }
            console.log(' processed tile');
            return true;
        }

        console.log('not tile');

        gameObject = 0;

        try {
            key = equation[0].bodyA.parent.sprite.key;
            key2 = equation[0].bodyB.parent.sprite.key;
            gameObject = true;
        }
        catch (e)
        {
            gameObject = 0;
        }

        if (gameObject) {
            console.log("Fireball hit " + key + " or " + key2);
            if (key == 'barrel' || key2 == 'barrel') {
                score = score + 10;
                this.stompSnd.play();
                this.scoreShow.setText(score);

                explodeSmoke(body.sprite.x, body.sprite.y, this.game, "barrel");
                equation[0].bodyA.parent.sprite.destroy();
                equation[0].bodyB.parent.sprite.destroy();
                emitter.maxEnemies++;

            }
        }
    },
    playerHit: function (body, shape, shape2, equation) {

        var gameObject = 0;
        try {
            gameObject = equation[0].bodyB.parent.gameObject;
        }
        catch (e)
        {
            gameObject = 0;
        }

        if (!gameObject) {

            try {
                gameObject = body.gameObject;
            }
            catch (e)
            {
                gameObject = 0;
            }
        }

        if (gameObject)
        {
            console.log("Player hit " + gameObject.name);
            if (gameObject.name == 'Barrel' && !this.playerDead) {
                this.theme.stop();
                this.gameoverSnd.play();

                this.playerDead = true;

                this.game.add.tween(player).to({angle: '+2000', alpha: 0}, 4000, Phaser.Easing.Linear.None, true, 100);
                player.body.destroy();

                function gameOver() {
                    this.game.state.start("GameOver");
                }
                this.game.time.events.add(Phaser.Timer.SECOND * 4, gameOver, this);
            }
            
            if (gameObject.name == 'T24') {
                this.theme.stop();
                this.game.state.start("LevelOver");
                
            }

            if (gameObject.name == 'T23' && !this.playerDead) {
                this.theme.stop();
                this.gameoverSnd.play();

                this.playerDead = true;
                this.game.add.tween(player).to({angle: '+2000', alpha: 0}, 4000, Phaser.Easing.Linear.None, true, 100);
                player.body.destroy();

                function gameOver() {
                    this.game.state.start("GameOver");
                }
                this.game.time.events.add(Phaser.Timer.SECOND * 4, gameOver, this);
            }
            
            if (gameObject.name == 'AnimatedBlock142' && !this.playerDead) {
                this.theme.stop();
                this.gameoverSnd.play();

                this.playerDead = true;
                this.game.add.tween(player).to({angle: '+2000', alpha: 0}, 4000, Phaser.Easing.Linear.None, true, 100);
                player.body.destroy();

                function gameOver() {
                    this.game.state.start("GameOver");
                }
                this.game.time.events.add(Phaser.Timer.SECOND * 4, gameOver, this);
            }

            if (gameObject.name == 'trampoline') {
                this.fireworksSnd.play();
                explodeCircle(player.x, player.y, this.game, '', emitter5);
                player.body.velocity.y = -800;
            }
            
            if (gameObject.name == 'T41'||gameObject.name == 'T42'||gameObject.name == 'T43'||gameObject.name == 'T44') { // teleport
                player.body.x=gameObject.targetX;
                player.body.y=gameObject.targetY;
                player.body.velocity.x=0;
                player.body.velocity.y=0;
            }

            if (gameObject.name == 'coin') {

                map.removeTile(body.tile.x, body.tile.y);
                this.game.physics.p2.removeBody(body);
                this.coinSnd.play();
                coinsCollected++;
                score = score + 50;
                this.scoreShow.setText(score);
                coinUp(body.tile.x * TILE_SIZE + TILE_SIZE / 2, body.tile.y * TILE_SIZE + TILE_SIZE / 2, this.game);

            }

            if (gameObject.name == 'mushroom') {

                inventory.hud5 = true;
                hud5.alpha = 1;
                map.removeTile(body.tile.x, body.tile.y);
                this.game.physics.p2.removeBody(body);
                this.fireworksSnd.play();
                score = score + 100;
                this.scoreShow.setText(score);
                explodeBits(body.tile.x * TILE_SIZE + TILE_SIZE / 2, body.tile.y * TILE_SIZE + TILE_SIZE / 2, this.game, '', emitter1);

            }

            if (gameObject.name == 'T33') {

                map.removeTile(body.tile.x, body.tile.y);
                this.game.physics.p2.removeBody(body);
                this.fireworksSnd.play();
                score = score + 100;
                this.scoreShow.setText(score);
                explodeBits(body.tile.x * TILE_SIZE + TILE_SIZE / 2, body.tile.y * TILE_SIZE + TILE_SIZE / 2, this.game, '', emitter5);
                hud1.alpha = 1;
                inventory.hud1 = true;
            }

            if (gameObject.name == 'T34') {

                map.removeTile(body.tile.x, body.tile.y);
                this.game.physics.p2.removeBody(body);
                this.fireworksSnd.play();
                score = score + 100;
                this.scoreShow.setText(score);
                explodeBits(body.tile.x * TILE_SIZE + TILE_SIZE / 2, body.tile.y * TILE_SIZE + TILE_SIZE / 2, this.game, '', emitter6);
                hud2.alpha = 1;
                inventory.hud2 = true;
            }

            if (gameObject.name == 'T35') {

                map.removeTile(body.tile.x, body.tile.y);
                this.game.physics.p2.removeBody(body);
                this.fireworksSnd.play();
                score = score + 100;
                this.scoreShow.setText(score);
                explodeBits(body.tile.x * TILE_SIZE + TILE_SIZE / 2, body.tile.y * TILE_SIZE + TILE_SIZE / 2, this.game, '', emitter7);
                hud3.alpha = 1;
                inventory.hud3 = true;
            }

            if (gameObject.name == 'T36') {

                map.removeTile(body.tile.x, body.tile.y);
                this.game.physics.p2.removeBody(body);
                this.fireworksSnd.play();
                score = score + 100;
                this.scoreShow.setText(score);
                explodeBits(body.tile.x * TILE_SIZE + TILE_SIZE / 2, body.tile.y * TILE_SIZE + TILE_SIZE / 2, this.game, '', emitter8);
                hud4.alpha = 1;
                inventory.hud4 = true;
            }

            if (gameObject.name == 'T27' || gameObject.name == 'T28' || gameObject.name == 'T29' || gameObject.name == 'T30') {
                var unlock = false;
                var theEmitter = emitter5;
                switch (gameObject.name) {
                    case 'T27':
                        tileTarget = 49;
                        hud1.alpha = 0;
                        if (inventory.hud1 == true) {
                            unlock = true;
                        }
                        break;
                    case 'T28':
                        tileTarget = 50;
                        hud2.alpha = 0;
                        if (inventory.hud2 == true) {
                            unlock = true;
                            theEmitter = emitter6;
                        }
                        break;
                    case 'T29':
                        tileTarget = 51;
                        hud3.alpha = 0;
                        if (inventory.hud3 == true) {
                            unlock = true;
                            theEmitter = emitter7;
                        }
                        break;
                    case 'T30':
                        tileTarget = 52;
                        hud4.alpha = 0;
                        if (inventory.hud4 == true) {
                            unlock = true;
                            theEmitter = emitter8;
                        }

                        break;
                }

                if (unlock) {
                    map.removeTile(body.tile.x, body.tile.y);
                    this.game.physics.p2.removeBody(body);
                    this.fireworksSnd.play();
                    score = score + 100;
                    this.scoreShow.setText(score);
                    explodeBits(body.tile.x * TILE_SIZE + TILE_SIZE / 2, body.tile.y * TILE_SIZE + TILE_SIZE / 2, this.game, '', theEmitter);

                    inventory.removeItem('mushroom');

                    //findall items in that are unlocked and remove
                    for (var x = 0, l = mapbody.length; x < l; x++) {
                        if (mapbody[x].tile.index == tileTarget) {
                            map.removeTile(mapbody[x].tile.x, mapbody[x].tile.y);
                            this.game.physics.p2.removeBody(mapbody[x]);
                            explodeBits(mapbody[x].tile.x * TILE_SIZE + TILE_SIZE / 2, mapbody[x].tile.y * TILE_SIZE + TILE_SIZE / 2, this.game, '', theEmitter);

                        }
                    }
                }
            }
        }
    },
    create: function () {

        //some useful functions
        function gofull() {
            this.game.scale.startFullScreen(false);
        }

        function goTitle() {
            this.theme.stop();
            this.game.state.start("LevelSelector");
        }

        function addEnemy() {
            emitter.launch();
        }

        // reset variables
        
        enemies = [];
        Animator = [];
        score = 0;
        coinsCollected = 0;
        secretsCollected = 0;
        totalCoins=0;
        totalSecrets=0;
        
        if (!this.game.device.desktop){
            useVirtualJoystick=true;
        }
        emitter = new Emitter(this.game, enemies, 0);

        function mapHit(body1, body2) {
            console.log('Map hit - body1='+body1.tile.index+' body2='+body2+' body2vel='+body2.velocity.y);

            //coin block
            if (body1.tile.index !== null) {
                if (body1.tile.coins>0&&(body1.tile.index == 47||body1.tile.index == 48)&& body1.y - body2.y < -80) { // hit from bottom
                    body1.tile.coins--;
                    this.coinSnd.play();
                    score = score + 50;
                    this.scoreShow.setText(score);

                    coinUp(body1.tile.x * TILE_SIZE + TILE_SIZE / 2, body1.tile.y * TILE_SIZE + TILE_SIZE / 2, this.game);
                    if (body1.tile.coins <= 0) {
                        this.breakblockSnd.play();
                        secretsCollected++;
                        explodeSmoke(body1.tile.x * TILE_SIZE + TILE_SIZE / 2, body1.tile.y * TILE_SIZE + TILE_SIZE / 2, this.game);
                        explodeBits(body1.tile.x * TILE_SIZE + TILE_SIZE / 2, body1.tile.y * TILE_SIZE + TILE_SIZE / 2, this.game, '', emitter5);
                        
                        if (body1.tile.index==47){
                            this.game.physics.p2.removeBody(body1);
                            map.removeTile(body1.tile.x, body1.tile.y);
                        }
                    }
                }
                
                // smashable tiles
                if ((body1.tile.index >=53&&body1.tile.index<=58) && body1.y - body2.y < -80) { // hit from bottom

                    this.bumpSnd.play();
                    score = score + 5;
                    this.scoreShow.setText(score);
                    explodeSmoke(body1.tile.x * TILE_SIZE + TILE_SIZE / 2, body1.tile.y * TILE_SIZE + TILE_SIZE / 2, this.game);
                    this.game.physics.p2.removeBody(body1);
                    map.removeTile(body1.tile.x, body1.tile.y);     
                }

                // lava
                if (body1.tile.index == 102) {
                    this.game.state.start("GameOver");
                }
            }
        }

        // load background parallax
        land = this.game.add.tileSprite(0, 0, 800, 600, 'back1');
        land.fixedToCamera = true;

        land2 = this.game.add.tileSprite(0, 0, 800, 600, 'back2');
        land2.fixedToCamera = true;

        land3 = this.game.add.sprite(0, 1100, 'back3');
        land3.scale.set(2, 2);
        //land3.fixedToCamera = true;

        if (!this.game.device.desktop) {
            this.game.input.onDown.add(gofull, this);
        } //go fullscreen on mobile devices

        this.game.physics.startSystem(Phaser.Physics.P2JS);  //activate physics
        this.game.physics.p2.gravity.y = 1200;  //realistic gravity
        this.game.world.setBounds(0, 0, 2000, 600);//(x, y, width, height)
        this.game.physics.p2.setBoundsToWorld(true, true, false, true, false); //(left, right, top, bottom, setCollisionGroup)
        this.game.physics.p2.friction = 0.25;   // default friction between ground and player or fireballs

        //  The 'mario' key here is the Loader key given in game.load.tilemap
        map = this.game.add.tilemap(leveltext);

        map.addTilesetImage('super_mario', 'tiles');

        //  Creates a layer from the Tiles layer in the map data.
        layer = map.createLayer('Tiles');
        //console.log(layer);
        //  This resizes the game world to match the layer dimensions
        layer.resizeWorld();
        //layer.debug = true;

        fireballs = this.game.add.group();  // add a new group for fireballs
        fireballs.createMultiple(500, 'fireball', 0, false);  // create plenty of them hidden and out of the game world

        //setup our player
        player = this.game.add.sprite(230, 1700, 'mario'); //create and position player
        this.game.physics.p2.enable(player);
        player.body.setCircle(22);  // collision circle 
        player.body.fixedRotation = true; // do not rotate on collision
        player.body.mass = 4;
        //player.body.setCollisionGroup(playerCollisionGroup);
        //player.body.collides([playerCollisionGroup, tileCollisionGroup, enemyCollisionGroup]);
        //player.body.debug=true;

        // collision logic
        this.game.physics.p2.setImpactEvents(true);
        player.body.onBeginContact.add(this.playerHit, this);
        this.playerDead = false;

        map.setCollisionBetween(1, 300);
        mapbody = this.convertTilemap(map, layer, true, false);
        for (var x = 0, l = mapbody.length; x < l; x++) {
            //mapbody[x].setCollisionGroup(tileCollisionGroup);
            //mapbody[x].collides([tileCollisionGroup, enemyCollisionGroup, playerCollisionGroup]);

            mapbody[x].createBodyCallback(player, mapHit, this);
        }

        layerobjects_tiles = this.game.physics.p2.convertCollisionObjects(map, "Collision");

        // add some animations 
        player.animations.add('walk', [1, 2, 3, 4], 10, true);  // (key, framesarray, fps,repeat)
        player.animations.add('duck', [11], 0, true);
        player.animations.add('duckwalk', [10, 11, 12], 3, true);
        this.game.camera.follow(player); //always center player

        // setup keyboard
        cursors = this.game.input.keyboard.createCursorKeys();

        // create our virtual game controller buttons
        if (useVirtualJoystick) {
            buttonjump = this.game.add.button(600, 500, 'buttonjump', null, this, 0, 1, 0, 1);  //game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
            buttonjump.fixedToCamera = true;  //our buttons should stay on the same place  
            buttonjump.events.onInputOver.add(function () {
                jump = true;
            });
            buttonjump.events.onInputOut.add(function () {
                jump = false;
            });
            buttonjump.events.onInputDown.add(function () {
                jump = true;
            });
            buttonjump.events.onInputUp.add(function () {
                jump = false;
            });

            buttonfire = this.game.add.button(700, 500, 'buttonfire', null, this, 0, 1, 0, 1);
            buttonfire.fixedToCamera = true;
            buttonfire.events.onInputOver.add(function () {
                fire = true;
            });
            buttonfire.events.onInputOut.add(function () {
                fire = false;
            });
            buttonfire.events.onInputDown.add(function () {
                fire = true;
            });
            buttonfire.events.onInputUp.add(function () {
                fire = false;
            });

            buttonleft = this.game.add.button(0, 472, 'buttonhorizontal', null, this, 0, 1, 0, 1);
            buttonleft.fixedToCamera = true;
            buttonleft.events.onInputOver.add(function () {
                left = true;
            });
            buttonleft.events.onInputOut.add(function () {
                left = false;
                player.body.velocity.x = 0;
            });
            buttonleft.events.onInputDown.add(function () {
                left = true;
            });
            buttonleft.events.onInputUp.add(function () {
                left = false;
                player.body.velocity.x = 0;
            });

            buttonbottomleft = this.game.add.button(32, 536, 'buttondiagonal', null, this, 6, 4, 6, 4);
            buttonbottomleft.fixedToCamera = true;
            buttonbottomleft.events.onInputOver.add(function () {
                left = true;
                duck = true;
            });
            buttonbottomleft.events.onInputOut.add(function () {
                left = false;
                duck = false;
            });
            buttonbottomleft.events.onInputDown.add(function () {
                left = true;
                duck = true;
            });
            buttonbottomleft.events.onInputUp.add(function () {
                left = false;
                duck = false;
            });

            buttonright = this.game.add.button(160, 472, 'buttonhorizontal', null, this, 0, 1, 0, 1);
            buttonright.fixedToCamera = true;
            buttonright.events.onInputOver.add(function () {
                right = true;
            });
            buttonright.events.onInputOut.add(function () {
                right = false;
                player.body.velocity.x = 0;
            });
            buttonright.events.onInputDown.add(function () {
                right = true;
            });
            buttonright.events.onInputUp.add(function () {
                right = false;
                player.body.velocity.x = 0;
            });

            buttonbottomright = this.game.add.button(160, 536, 'buttondiagonal', null, this, 7, 5, 7, 5);
            buttonbottomright.fixedToCamera = true;
            buttonbottomright.events.onInputOver.add(function () {
                right = true;
                duck = true;
            });
            buttonbottomright.events.onInputOut.add(function () {
                right = false;
                duck = false;
            });
            buttonbottomright.events.onInputDown.add(function () {
                right = true;
                duck = true;
            });
            buttonbottomright.events.onInputUp.add(function () {
                right = false;
                duck = false;
            });

            buttondown = this.game.add.button(96, 536, 'buttonvertical', null, this, 0, 1, 0, 1);
            buttondown.fixedToCamera = true;
            buttondown.events.onInputOver.add(function () {
                duck = true;
            });
            buttondown.events.onInputOut.add(function () {
                duck = false;
            });
            buttondown.events.onInputDown.add(function () {
                duck = true;
            });
            buttondown.events.onInputUp.add(function () {
                duck = false;
            });
        }

        // HUD Stuff

        var playButton = this.game.add.button(100, 60, "button1", goTitle, this);
        playButton.scale.x=0.4;
        playButton.scale.y=0.4;
        playButton.fixedToCamera = true;
        playButton.anchor.setTo(0.5, 0.5);

        hud1 = this.game.add.sprite(200, 60, "hud1");
        hud1.fixedToCamera = true;
        hud1.anchor.setTo(0.5, 0.5);

        hud2 = this.game.add.sprite(270, 60, "hud2");
        hud2.fixedToCamera = true;
        hud2.anchor.setTo(0.5, 0.5);

        hud3 = this.game.add.sprite(340, 60, "hud3");
        hud3.fixedToCamera = true;
        hud3.anchor.setTo(0.5, 0.5);

        hud4 = this.game.add.sprite(410, 60, "hud4");
        hud4.fixedToCamera = true;
        hud4.anchor.setTo(0.5, 0.5);

        hud5 = this.game.add.sprite(480, 60, "fireball");
        hud5.fixedToCamera = true;
        hud5.anchor.setTo(0.5, 0.5);

        hud1.alpha = 0;
        hud2.alpha = 0;
        hud3.alpha = 0;
        hud4.alpha = 0;
        hud5.alpha = 0;

        var style = {font: "bold 64px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};

        //  The Text is positioned at 0, 100
        this.scoreShow = this.game.add.text(500, 10, "0", style);
        this.scoreShow.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        this.scoreShow.fixedToCamera = true;

        this.coinSnd = this.add.audio("coin");
        this.bumpSnd = this.add.audio("bump");
        this.breakblockSnd = this.add.audio("breakblock");
        this.jumpSnd = this.add.audio("jump");
        this.stompSnd = this.add.audio("stomp");
        this.fireballSnd = this.add.audio("fireball");
        this.fireworksSnd = this.add.audio("fireworks");
        this.dieSnd = this.add.audio("die");
        this.gameoverSnd = this.add.audio("gameover");
        this.themeSnd = this.add.audio("theme");

        emitter9 = this.game.add.emitter(0, 0, 300);
        emitter9.makeParticles('bits');
        emitter8 = this.game.add.emitter(0, 0, 300);
        emitter8.makeParticles('star4');
        emitter7 = this.game.add.emitter(0, 0, 300);
        emitter7.makeParticles('star3');
        emitter6 = this.game.add.emitter(0, 0, 300);
        emitter6.makeParticles('star2');
        emitter5 = this.game.add.emitter(0, 0, 300);
        emitter5.makeParticles('star1');

        emitter4 = this.game.add.emitter(0, 0, 300);
        emitter4.makeParticles('star');
        emitter3 = this.game.add.emitter(0, 0, 300);
        emitter3.makeParticles('coin');
        emitter2 = this.game.add.emitter(0, 0, 300);
        emitter2.makeParticles('smoke');
        emitter1 = this.game.add.emitter(0, 0, 300);
        emitter1.makeParticles('star');

        if (this.theme) {
            this.theme.stop()
        }
        this.theme = this.themeSnd.play();

        inventory = new Inventory();
    },
    jump_now: function () {  //jump with small delay
        if (this.game.time.now > nextJump) {
            this.jumpSnd.play();
            player.body.moveUp(500);
            nextJump = this.game.time.now + 900;
        }
    },
    playerTouching: function () {
        if (this.playerDead) {
            return false;
        }
        var threshold = 0.5;
        var xAxis = p2.vec2.fromValues(1, 0);
        var yAxis = p2.vec2.fromValues(0, 1);
        var result = {left: false, right: false, down: false};
        this.game.physics.p2.world.narrowphase.contactEquations.forEach(function (c) {
            if (c.bodyA === player.body.data || c.bodyB === player.body.data) {
                var dx = p2.vec2.dot(c.normalA, xAxis);
                var dy = p2.vec2.dot(c.normalA, yAxis);
                if (c.bodyA === player.body.data) {
                    dx *= -1;
                    dy *= -1;
                }
                if (dx <= -threshold) {
                    result.left = true;
                }
                if (dx > threshold) {
                    result.right = true;
                }
                if (dy > threshold) {
                    result.down = true;
                }
            }
        }, this);
        return result;
    },
    fire_now: function () {

        if (this.game.time.now > nextFire) {
            nextFire = this.game.time.now + fireRate;
            this.fireballSnd.play();
            var fireball = fireballs.getFirstExists(false); // get the first created fireball that no exists atm
            if (fireball) {
                fireball.exists = true;  // come to existance !
                fireball.lifespan = 2500;  // remove the fireball after 2500 milliseconds - back to non-existance
                if (player.scale.x == -1) {  // if player looks to the left - create the fireball on his left side
                    fireball.reset(player.x - 20, player.y);
                    this.game.physics.p2.enable(fireball);
                    fireball.body.moveLeft(800);
                    fireball.body.moveDown(180);
                } else {
                    fireball.reset(player.x + 20, player.y);
                    this.game.physics.p2.enable(fireball);
                    fireball.body.moveRight(800);
                    fireball.body.moveDown(180);
                }
                fireball.body.setCircle(10);
                //fireball.body.debug=true;
                fireball.body.onBeginContact.add(this.fireballHit, this);
            }
        }
    },
    convertTilemap: function (map, layer, addToWorld, optimize) {
        // 0 - 8 - enemies
        // 8 - 22 - decoration
        // 22 - 43 - sensors & collectables
        // 44 - 67 static blocks
        // 67 - 88 - half blocks
        // 88 - dynamic movable blocks
        layer = map.getLayer(layer);

        if (typeof addToWorld === 'undefined') {
            addToWorld = true;
        }
        if (typeof optimize === 'undefined') {
            optimize = true;
        }

        //  If the bodies array is already populated we need to nuke it
        //this.clearTilemapLayerBodies(map, layer);

        var width = 0;
        var sx = 0;
        var sy = 0;

        for (var y = 0, h = map.layers[layer].height; y < h; y++)
        {
            width = 0;
            for (var x = 0, w = map.layers[layer].width; x < w; x++)
            {
                var tile = map.layers[layer].data[y][x];

                sx = tile.x * tile.width;
                sy = tile.y * tile.height;

                if (tile.index == 1) { // enemy1
                    emitter.addEnemy(sx + tile.width / 2, sy + tile.height / 2, 50);
                    map.removeTile(tile.x, tile.y);
                }

                if (tile.index >= 88 && tile.index != 141 && tile.index != 142) { // movable blocks
                    var block = this.game.add.sprite(sx + tile.width / 2, sy + tile.height / 2, 'tileSprites', tile.index);
                    this.game.physics.p2.enable(block);
                    block.body.fixedRotation = true;
                    block.body.mass = 4;
                    map.removeTile(tile.x, tile.y);
                }

                if (tile.index == 141) { // animated blocks
                    new AnimatedBlock(tile.index, this.game, sx + tile.width / 2, sy + tile.height / 2, 340, tile.properties.direction);
                    map.removeTile(tile.x, tile.y);
                }

                if (tile.index == 142) { // animated blocks
                    new AnimatedBlock(tile.index, this.game, sx + tile.width / 2, sy + tile.height / 2, 40, tile.properties.direction);
                    map.removeTile(tile.x, tile.y);
                }
                
                if (tile.index >= 67 && tile.index < 74) { // half blocks

                    //var block = this.game.add.sprite(sx + tile.width / 2, sy + tile.height / 2, 'tileSprites', tile.index);
                    
                    sx = tile.x * tile.width;
                    sy = tile.y * tile.height;
                    var body = this.game.physics.p2.createBody(sx, sy, 0, false);
                    body.debug=true;
                    body.tile = tile;
                    body.addRectangle(tile.width, tile.height/2, tile.width / 2, tile.width/4, 0);
                    body.static=true;
                    if (addToWorld)
                            {
                                this.game.physics.p2.addBody(body);
                            }

                    map.layers[layer].bodies.push(body);
         
                     
                }

                if (tile && tile.collides && tile.index > 22 && tile.index < 67 || (tile.index>=74&&tile.index<88))
                {
                    // //console.log(tile.index);
                    if (optimize)
                    {
                        var right = map.getTileRight(layer, x, y);
                        if (width === 0)
                        {
                            sx = tile.x * tile.width;
                            sy = tile.y * tile.height;
                            width = tile.width;
                        }
                        if (right && right.collides)
                        {
                            width += tile.width;
                        }
                        else
                        {
                            var body = this.game.physics.p2.createBody(sx, sy, 0, false);
                            body.tile = tile;
                            body.addRectangle(width, tile.height, width / 2, tile.height / 2, 0);

                            if (addToWorld)
                            {
                                this.game.physics.p2.addBody(body);
                            }

                            map.layers[layer].bodies.push(body);

                            width = 0;
                        }
                    }
                    else
                    {

                        var body = this.game.physics.p2.createBody(tile.x * tile.width, tile.y * tile.height, 0, false);

                        // circles versus blocks
                        if (tile.index == 12) {
                            var shape = body.addCircle(64, 0, 0, 0);
                        }
                        else
                        {
                            var shape = body.addRectangle(tile.width, tile.height, tile.width / 2, tile.height / 2, 0);
                        }

                        if (tile.index >= 22 && tile.index <= 44) {
                            body.gameObject = {};
                            body.gameObject.name = 'T' + tile.index;
                            if (tile.index==44){
                                body.gameObject.targetX=tile.properties.targetX;
                                body.gameObject.targetY=tile.properties.targetY;
                            }
                            shape.sensor = true;
                        }

                        if (tile.index == 25) {
                            body.gameObject.name = 'trampoline';
                        }

                        if (tile.index == 31) {
                            body.gameObject.name = 'coin';
                            totalCoins++;
                        }

                        if (tile.index == 1) {
                            //add enemy

                        }

                        if (tile.index == 32) {
                            body.gameObject.name = 'mushroom';
                        }


                        // coin tile block
                        if (tile.index == 47 || tile.index == 48) {
                            tile.coins = 5;
                            totalSecrets++;
                        }
                        body.tile = tile;

                        if (addToWorld)
                        {
                            this.game.physics.p2.addBody(body);
                        }

                        map.layers[layer].bodies.push(body);
                    }

                }

            }
        }

        return map.layers[layer].bodies;
    },
    update: function () {

        emitter.update();
        for (var i = 0; i < Animator.length; i++)
        {
            Animator[i].update();
        }

        var touching = this.playerTouching();

        land2.tilePosition.x = -this.game.camera.x * 1.2;
        land2.tilePosition.y = -this.game.camera.y * 1.02;
        land3.x = -this.game.camera.x * 0.1;
        land3.y = -this.game.camera.y * 0.1 + 1100;

        if (!this.playerDead) {


            if (!useVirtualJoystick) {
                if (cursors.left.isDown) {
                    left = true;
                }
                if (cursors.right.isDown) {
                    right = true;
                }
                jump = false;
                if (touching.down && cursors.up.isDown && checkIfCanJump) {
                    //explodeFairy(player.x, player.y, this.game,'',emitter1);
                    //explodeSmoke(player.x, player.y, this.game,'',emitter8);

                    jump = true;
                }
                if (cursors.up.isUp) {

                    jump = false;
                }

                if (cursors.right.isUp)
                {
                    right = false;
                    if (touching.down) {
                        player.body.velocity.x = 0;
                    }
                }
                if (cursors.left.isUp)
                {
                    left = false;
                    if (touching.down) {
                        player.body.velocity.x = 0;
                    }
                }

                if (cursors.down.isDown)
                {
                    duck = true;
                }

                if (cursors.down.isUp)
                {
                    duck = false;
                }

                fire = false;
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                    fire = true;
                }


            }

            // define what should happen when a button is pressed
            if (left && !duck) {
                player.scale.x = -1;
                //player.body.moveLeft(300);
                player.body.velocity.x = -300
                player.animations.play('walk');
            }
            else if (right && !duck) {
                player.scale.x = 1;
                //player.body.moveRight(300);
                player.body.velocity.x = 300
                player.animations.play('walk');
            }
            else if (duck && !left && !right) {
                player.body.velocity.x = 0;
                player.animations.play('duck');
            }
            else if (duck && right) {
                player.scale.x = 1;
                player.body.moveRight(150);
                player.animations.play('duckwalk');
            }
            else if (duck && left) {
                player.scale.x = -1;
                player.body.moveLeft(150);
                player.animations.play('duckwalk');
            }
            else {
                player.loadTexture('mario', 0);
            }
            if (jump) {
                this.jump_now();
                player.loadTexture('mario', 5);
            }  //change to another frame of the spritesheet
            if (fire && inventory.hud5 == true) {
                this.fire_now();
                player.loadTexture('mario', 8);
            }
            if (duck) {
                player.body.setCircle(16, 0, 6);
            } else {
                player.body.setCircle(22);
            }  //when ducking create a smaller hitarea - (radius,offsetx,offsety)
            if (this.game.input.currentPointers == 0 && !this.game.input.activePointer.isMouse) {
                fire = false;
                right = false;
                left = false;
                duck = false;
                jump = false;
            } //this works around a "bug" where a button gets stuck in pressed state
        }
    },
    render: function () {
        this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");
    }
};

var checkIfCanJump = function (game, body) {

    if (!body) {
        return false;
    }
    var yAxis = p2.vec2.fromValues(0, 1);
    var result = false;

    for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++)
    {
        var c = game.physics.p2.world.narrowphase.contactEquations[i];

        if (c.bodyA === body.data || c.bodyB === body.data)
        {
            var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
            if (c.bodyA === body.data)
                d *= -1;
            if (d > 0.5)
                result = true;
        }
    }
    return result;
}