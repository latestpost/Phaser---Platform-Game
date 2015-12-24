// emitter

Emitter = function (game, enemies, maxEnemies) {
    this.game = game;
    this.enemies = enemies;
    this.index = 0;
    this.countdown = 200;
    this.maxEnemies = maxEnemies
}

Emitter.prototype.update = function () {
    this.countdown--;
    //console.log(this.countdown);
    for (var i = 0; i < this.enemies.length; i++)
    {
        if (this.enemies[i].alive)
        {
            enemies[i].update();
        }
    }
    if (this.countdown < 0 && this.enemies.length < this.maxEnemies) {
        this.launch();
    }
}

Emitter.prototype.addEnemy = function (x, y, directionCountdownMax) {
    this.enemies.push(new Barrel(this.index, this.game, x, y, directionCountdownMax));
}

Emitter.prototype.launch = function () {
    this.addEnemy(700, 600);
    this.index++;
    this.countdown = Math.floor((Math.random() * 100) + 30);
    ;
}

// barrel

Inventory = function () {
    this.hud1 = false;
    this.hud2 = false;
    this.hud3 = false;
    this.hud4 = false;
}

Inventory.prototype.removeItem = function (item) {
}


Barrel = function (index, game, x, y, directionCountdownMax) {

    this.directionCountdownMax = directionCountdownMax;
    this.directionCountdown = this.directionCountdownMax;
    this.game = game;
    this.health = 3;
    this.index = index;
    this.alive = true;
    this.direction = -1;
    this.name = 'Barrel';

    this.sprite = game.add.sprite(x, y, 'barrel');
    game.physics.p2.enable(this.sprite);
    this.sprite.body.gameObject = this;
    this.sprite.body.setCircle(18);  // collision circle 
    this.sprite.body.fixedRotation = true; // do not rotate on collision
    this.sprite.body.mass = 4;
    //this.sprite.body.setCollisionGroup(enemyCollisionGroup);
    //this.sprite.body.collides([tileCollisionGroup, playerCollisionGroup]);
    this.sprite.body.onBeginContact.add(this.hit, this);
    //this.sprite.body.debug=true;
};

Barrel.prototype.hit = function (body, shape, shape2, equation) {
};

Barrel.prototype.damage = function () {
};

Barrel.prototype.update = function () {
    
    this.directionCountdown--;
    if (this.directionCountdown < 0) {
        this.direction = this.direction * -1;
        this.directionCountdown = this.directionCountdownMax;
    }
    if (checkIfCanJump(this.game, this.sprite.body)) {
        if (this.direction == -1) {
            this.sprite.body.velocity.x = 200;
        }
        else
        {
            this.sprite.body.velocity.x = -200;
        }
    }
};


AnimatedBlock = function (index, game, x, y, directionCountdownMax,direction) {

    this.directionCountdownMax = directionCountdownMax;
    this.directionCountdown = this.directionCountdownMax;
    this.game = game;
    this.health = 3;
    this.index = index;
    this.alive = true;
    this.direction = direction;
    this.name = 'AnimatedBlock'+index;

    this.sprite = game.add.sprite(x, y, 'tileSprites', index-1);
    game.physics.p2.enable(this.sprite);
    this.sprite.body.gameObject = this;
    this.sprite.body.fixedRotation = true; // do not rotate on collision
    this.sprite.body.mass = 4;
    this.sprite.body.kinematic=true;
    Animator.push(this);
};

AnimatedBlock.prototype.update = function () {
    this.directionCountdown--;

    if (this.directionCountdown < 0) {
        this.direction = this.direction * -1;
        this.directionCountdown = this.directionCountdownMax;
    }
        if (this.direction == -1) {
            this.sprite.body.velocity.y = -100;
        }
        else
        {
            this.sprite.body.velocity.y = 100;
        }
};