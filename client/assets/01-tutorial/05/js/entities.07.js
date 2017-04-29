// -----------------------------------------------------------------------------
// entities : 엔티티 객체들
// -----------------------------------------------------------------------------

var player;
var enemies     = {};
var upgrades    = {};
var bullets     = {};


// -----------------------------------------------------------------------------
// 엔티티
Entity = function(type,id,x,y,width,height,image) {
    var self = {
        type    : type,
        id      : id,
        x       : x,
        y       : y,
        width   : width,
        height  : height,
        image   : image,
    }
    // 갱신
    self.update = function () {
        self.updatePosition();
        self.draw();
    }
    // 그리기
    self.draw = function() {
        ctx.save();

        // 플레이어와 떨어진 거리만큼 위치시킨다.
        var x = self.x - player.x;
        var y = self.y - player.y;
        x += WIDTH/2;
        y += HEIGHT/2;
        x -= self.width/2;
        y -= self.height/2;

        ctx.drawImage(self.image,0,0,self.image.width,self.image.height,x,y,width,height);
        ctx.restore();
    }
    // 두 물체 사이의 거리값을 구한다.
    self.getDistance = function ( entity2 ) {
        var vx = self.x - entity2.x;
        var vy = self.y - entity2.y;
        return Math.sqrt( vx*vx + vy*vy );
    }
    // 두 물체가 충돌했는지 알아낸다.
    self.testCollision = function ( entity2 ) {
        var rect1 = {
            x:self.x-self.width/2,
            y:self.y-self.height/2,
            width:self.width,
            height:self.height,
        }
        var rect2 = {
            x:entity2.x-entity2.width/2,
            y:entity2.y-entity2.height/2,
            width:entity2.width,
            height:entity2.height,
        }
        return testCollisionRectRect( rect1, rect2 );
    }
    // 위치 갱신
    self.updatePosition = function() {}

    return self;
}

// -----------------------------------------------------------------------------
// 액터
Actor = function( type, id, x, y, width, height, image, hp, attackSpeed ) {
    var self = Entity( type, id, x, y, width, height, image );

    self.hp              = hp           ;
    self.attackSpeed     = attackSpeed  ; // 공격속도 (초당 발사량)
    self.attackCounter   =  0           ; // 공격카운터, 공격속도를 컨트롤할때 매개체로 사용한다.
    self.aimAngle        =  0           ; // 공격방향(각도)

    // 갱신
    var super_update = self.update;
    self.update = function() {
        super_update();
        self.attackCounter += self.attackSpeed;
    }

    // 공격 수행
    self.performAttack = function() {
        // 탄환 생성
        if( self.attackCounter > 25 ) { // 매 1초마다
            self.attackCounter = 0;
            generateBullet(self);
        }
    }
    // 특수 공격 수행
    self.performSpecialAttack = function(){
        // 탄환 생성
        if( self.attackCounter > 50 ) {

            // 3연발 탄환 생성
            generateBullet(self, self.aimAngle - 5);
            generateBullet(self, self.aimAngle);
            generateBullet(self, self.aimAngle + 5);
            // 방사형 탄환 생성
            //for( var angle=0; angle < 360; angle++ ){
            //    generateBullet(self, angle);
            //}

            self.attackCounter = 0;
        }
    }

    return self;
}

// -----------------------------------------------------------------------------
// 플레이어
Player = function(){
    var self = Actor( 'player','myId', 50, 40, 50, 70, images.player, 10, 1 );

    self.pressingDown    = false;
    self.pressingUp      = false;
    self.pressingLeft    = false;
    self.pressingRight   = false;

    // 위치 갱신
    self.updatePosition = function() {
        if( self.pressingRight ) {
            self.x += 10;
        }
        if( self.pressingLeft ) {
            self.x -= 10;
        }
        if( self.pressingDown ) {
            self.y += 10;
        }
        if( self.pressingUp ) {
            self.y -= 10;
        }

        // 이동제한
        if( self.x < self.width/2 )
            self.x = self.width/2;
        if( self.x > currentMap.width-self.width/2 )
            self.x = currentMap.width-self.width/2;
        if( self.y < self.height/2 )
            self.y = self.height/2;
        if( self.y > currentMap.height-self.height/2 )
            self.y = currentMap.height-self.height/2;
    }
    // 갱신
    var super_update = self.update;
    self.update = function() {
        super_update();

        if( self.hp <= 0 ) {
            var timeSurvived = Date.now() - timeWhenGameStarted;
            console.log("You lost! | 플레이 시간 " + timeSurvived + " ms." );
            startNewGame();
        }
    }

    return self;
}

// -----------------------------------------------------------------------------
// 적군
Enemy = function ( id, x, y, width, height ) {
    var self = Actor('enemy',id,x,y,width,height,images.enemy, 10, 1 );

    var super_update = self.update;
    self.update = function() {
        super_update();
        self.performAttack();

        var isColliding = player.testCollision( self );
        if( isColliding ) {
            console.log('colliding!');
            player.hp = player.hp - 1;
        }
    }
    self.updatePosition = function() {

        // 플레이어를 따라다닌다.
        var diffX = player.x - self.x;
        var diffY = player.y - self.y;

        if( diffX > 0 ) {
            self.x += 3;
        } else {
            self.x -= 3;
        }

        if( diffY > 0 ) {
            self.y += 3;
        } else {
            self.y -= 3;
        }
    }

    enemies[id] = self;
}
// 무작위로 적군 생성
randomlyGenerateEnemy = function() {
    var id      = Math.random();
    var x       = Math.random() * currentMap.width;
    var y       = Math.random() * currentMap.height;
    var width   = 64;
    var height  = 64;
    Enemy( id, x, y, width, height );
}

// -----------------------------------------------------------------------------
// 강화 아이템
Upgrade = function ( id, x, y, width, height, category, image ) {
    var self = Entity('upgrade',id,x,y,width,height,image);

    var super_update = self.update;
    self.update = function() {
        super_update();

        var isColliding = player.testCollision( self );
        if( isColliding ) {
            if( self.category === 'score' ) {
                score += 1000;
            }
            if( self.category === 'attackSpeed' ) {
                player.attackSpeed += 3;
            }
            delete upgrades[self.id];
        }
    }

    self.category = category;
    upgrades[id] = self;
}
// 무작위로 강화 아이템 생성
randomlyGenerateUpgrade = function() {
    var id      = Math.random();
    var x       = Math.random() * currentMap.width;
    var y       = Math.random() * currentMap.height;
    var width   = 32;
    var height  = 32;

    if( Math.random()<0.5) {
        var category    = 'score';
        var image       = images.upgrade1;
    } else {
        var category    = 'attackSpeed';
        var image       = images.upgrade2;
    }

    Upgrade( id, x, y, width, height, category, image );
}

// -----------------------------------------------------------------------------
// 탄환
Bullet = function ( id, x, y, speedX, speedY, width, height, combatType ) {
    var self = Entity('bullet',id,x,y,width,height,images.bullet);
    self.lifeTime = 100;
    self.combatType = combatType;
    self.speedX = speedX;
    self.speedY = speedY;

    var super_update = self.update;
    self.update = function() {
        super_update();

        var toRemove = false;

        // 생명력 처리
        self.lifeTime--;
        if( self.lifeTime <= 0 ) {
            toRemove = true;
        }

        // 적군과 충돌 처리
        if( self.combatType === 'player' ) {
            for( var key2 in enemies ) {
                if( self.testCollision( enemies[key2] ) ) {
                   toRemove = true;
                    delete enemies[key2];
                }
            }
        } else if( self.combatType === 'enemy' ) {
            if( self.testCollision( player ) ) {
                toRemove = true;
                player.hp -= 1;
            }
        }

        if( toRemove ) {
            delete delete bullets[self.id];
        }
    }
    self.updatePosition = function() {
        self.x += self.speedX;
        self.y += self.speedY;

        if( self.x < 0 || self.x > currentMap.width ) {
            self.speedX = -self.speedX;
        }
        if( self.y < 0 || self.y > currentMap.height ) {
            self.speedY = -self.speedY;
        }
    }

    bullets[id] = self;
}
// 탄환 생성
generateBullet = function( actor, overwriteAngle ) {
    var id      = Math.random();
    var x       = actor.x;
    var y       = actor.y;
    var angle   = actor.aimAngle;
    if( overwriteAngle !== undefined ) {
        angle = overwriteAngle;
    }
    var speedX  = Math.cos(angle/180*Math.PI)*5;
    var speedY  = Math.sin(angle/180*Math.PI)*5;
    var width   = 32;
    var height  = 32;
    Bullet( id, x, y, speedX, speedY, width, height, actor.type );
}

