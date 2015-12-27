
function explode(x,y,game,graphic){
                graphic = graphic || "coin";
                //emitter2 = game.add.emitter(0,0, 300);
                emitter2.setRotation(0, 0);
                emitter2.setAlpha(1,0, 2000);
                //emitter2.setScale(0.1, 1, 0.1, 1, 6000, Phaser.Easing.Quintic.Out);
                emitter2.makeParticles(graphic);
                emitter2.gravity = 300;
                emitter2.minParticleScale = 0.25;
                emitter2.maxParticleScale = 0.5;
                emitter2.setYSpeed(-400,400);
                emitter2.x = x;
                emitter2.y = y;
                emitter2.start(true, 2000, null, 5);
            }
function explodeTile(x,y,game,index){
                index = index || 1;

                //emitter2.setRotation(0, 0);
                emitter2.setAlpha(1,0, 2000);
                //emitter2.makeParticles("tileSprites",index);
                emitter2.makeParticles("smoke");
                emitter2.gravity = 300;
                emitter2.minParticleScale = 0.25;
                emitter2.maxParticleScale = 0.5;
                emitter2.setYSpeed(-400,400);
                emitter2.x = x;
                emitter2.y = y;
                emitter2.start(true, 2000, null, 2);
            }         

function coinUp(x,y,game,graphic){
                graphic = graphic || "coin";;
                //emitter2.gravity = 300;
                emitter3.minRotation = 0;
                emitter3.maxRotation = 0;
                emitter3.minParticleScale = 0.5;
                emitter3.maxParticleScale = 0.5;
                emitter3.setYSpeed(-100,-150);
                emitter3.setXSpeed(-1,1);
                emitter3.x = x;
                emitter3.y = y;
                emitter3.setAlpha(1,0, 2000);
                emitter3.start(true, 2000, null, 1);
            }
 
function explodeWood(x,y,game,graphic,emitter1){
                graphic = graphic || "star";
                
                emitter1.gravity = 100;

                //emitter1.setYSpeed(-200,-250);
                //emitter1.setXSpeed(0,0);
                emitter1.x = x;
                emitter1.y = y;
                emitter1.setScale(0.2, 0.05, 0.2, 0.05, 6000, Phaser.Easing.Quintic.Out);
                emitter1.setAlpha(1,0, 2000);
                emitter1.start(true, 2000, null, 10);
                
                
            }
            
function explodeCircle(x,y,game,graphic,emitter1){
                graphic = graphic || "star";
                var radius=200;
                
                for (var i = 0; i < 360; i=i+36) {
                    var xsp = Math.cos(2 * Math.PI * i / 360.0) * radius;
                    emitter1.setXSpeed(xsp, xsp);
                    var ysp = Math.sin(2 * Math.PI * i / 360.0) * radius;
                    emitter1.setYSpeed(ysp, ysp);
                    emitter1.start(true, 2000, null, 1);
                    
                    emitter1.setScale(0.5, 0.05, 0.5, 0.05, 6000, Phaser.Easing.Quintic.Out);

                    emitter1.update();
                    emitter1.setRotation(0, 360);
                    emitter1.setAlpha(1,0, 2000);
                    emitter1.gravity = 0;
                    emitter1.minParticleScale = 0.5;
                    emitter1.maxParticleScale = 0.5;
                    emitter1.x = x;
                    emitter1.y = y;
                    }
                emitter1.start(true,2000,null,1);
                
            }
            
function explodeBits(x,y,game,graphic,emitter1){
                graphic = graphic || "star";

                emitter1.setRotation(0, 360);
                emitter1.setAlpha(1,0, 2000);
                //emitter1.setScale(1, 2, 1, 2, 6000, Phaser.Easing.Quintic.Out);
                emitter1.gravity = 0;
                emitter1.minParticleScale = 0.5;
                emitter1.maxParticleScale = 0.5;
                emitter1.setYSpeed(100,100);
                emitter1.setXSpeed(100,100);
                emitter1.x = x;
                emitter1.y = y;
                emitter1.start(true, 2000, null, 1);

               // emitter1.setRotation(0, 0);
                emitter1.setAlpha(1,0, 2000);
                //emitter1.makeParticles(graphic);
                //emitter1.setScale(1, 2, 1, 2, 6000, Phaser.Easing.Quintic.Out);
                emitter1.gravity = 0;
                emitter1.minParticleScale = 0.5;
                emitter1.maxParticleScale = 0.5;
                emitter1.setYSpeed(-100,-100);
                emitter1.setXSpeed(-100,-100);
                emitter1.x = x;
                emitter1.y = y;
                emitter1.start(true, 2000, null, 1);

               // emitter1.setRotation(0, 0);
                emitter1.setAlpha(1,0, 2000);
                //emitter1.makeParticles(graphic);
                //emitter1.setScale(1, 2, 1, 2, 6000, Phaser.Easing.Quintic.Out);
                emitter1.gravity = 0;
                emitter1.minParticleScale = 0.5;
                emitter1.maxParticleScale = 0.5;
                emitter1.setYSpeed(100,100);
                emitter1.setXSpeed(-100,-100);
                emitter1.x = x;
                emitter1.y = y;
                emitter1.start(true, 2000, null, 1);
                
               // emitter1.setRotation(0, 0);
                emitter1.setAlpha(1,0, 2000);
                //emitter1.makeParticles(graphic);
                //emitter1.setScale(1, 2, 1, 2, 6000, Phaser.Easing.Quintic.Out);
                emitter1.gravity = 0;
                emitter1.minParticleScale = 0.5;
                emitter1.maxParticleScale = 0.5;
                emitter1.setYSpeed(-100,-100);
                emitter1.setXSpeed(100,100);
                emitter1.x = x;
                emitter1.y = y;
                emitter1.start(true, 2000, null, 1);
                
            }
            
function explodeSmoke(x,y,game,graphic){
                graphic = graphic || "smoke";
                emitter2.setAlpha(0.5,0, 2000);
                emitter2.setRotation(0, 0);
                //emitter2.makeParticles(graphic);
                emitter2.setScale(1, 3, 1, 3, 6000, Phaser.Easing.Quintic.Out);
                emitter2.gravity = 0;
                emitter2.minParticleScale = 1;
                emitter2.maxParticleScale = 1;
                emitter2.setYSpeed(0,0);
                emitter2.setXSpeed(0,0);
                emitter2.x = x;
                emitter2.y = y;
                emitter2.start(true, 2000, null, 2);
                //game.add.tween(emitter2).to( { alpha: 0 }, 2000, "Linear", true, 0, Number.MAX_VALUE, true);
            }