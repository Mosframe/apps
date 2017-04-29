// -----------------------------------------------------------------------------
// entities : 엔티티 객체들
// -----------------------------------------------------------------------------

var player;
var enemies     = {};
var upgrades    = {};
var bullets     = {};


// -----------------------------------------------------------------------------
// 엔티티
Entity = function(type,id,x,y,speedX,speedY,width,height,image) {
    var self = {
        type    : type,
        id      : id,
        x       : x,
        y       : y,
        speedX  : speedX,
        speedY  : speedY,
        width   : width,
        height  : height,
        image   : image,
    }
    // 갱신
    self.update = function () {
        self.updatePosition();
        self.draw();
    }
    // 위치 갱신
    self.updatePosition = function() {
        self.x += self.speedX;
        self.y += self.speedY;

        if( self.x < 0 || self.x > WIDTH ) {
            self.speedX = -self.speedX;
        }
        if( self.y < 0 || self.y > HEIGHT ) {
            self.speedY = -self.speedY;
        }
    }
    // 그리기
    self.draw = function() {
        ctx.save();
        var x = self.x-self.width/2;
        var y = self.y-self.height/2;
        ctx.drawImage(self.image,x,y);
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

    return self;
}

// -----------------------------------------------------------------------------
// 액터
Actor = function( type, id, x, y, speedX, speedY, width, height, image, hp, attackSpeed ) {
    var self = Entity( type, id, x, y, speedX, speedY, width, height, image );

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
    var self = Actor( 'player','myId', 50, 40, 30, 5, 20, 20, images.player, 10, 1 );

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
        if( self.x > WIDTH-self.width/2 )
            self.x = WIDTH-self.width/2;
        if( self.y < self.height/2 )
            self.y = self.height/2;
        if( self.y > HEIGHT-self.height/2 )
            self.y = HEIGHT-self.height/2;
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
Enemy = function ( id, x, y, speedX, speedY, width, height ) {
    var self = Actor('enemy',id,x,y,speedX,speedY,width,height,images.enemy, 10, 1 );

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

    enemies[id] = self;
    }
    // 무작위로 적군 생성
    randomlyGenerateEnemy = function() {
    var id      = Math.random();
    var x       = Math.random() * WIDTH;
    var y       = Math.random() * HEIGHT;
    var speedX  =  5 + Math.random() *  5; //  5 ~ 10
    var speedY  =  5 + Math.random() *  5; //  5 ~ 10
    var width   = 10 + Math.random() * 30; // 10 ~ 40
    var height  = 10 + Math.random() * 30; // 10 ~ 40
    Enemy( id, x, y, speedX, speedY, width, height );
}

// -----------------------------------------------------------------------------
// 강화 아이템
Upgrade = function ( id, x, y, speedX, speedY, width, height, category, image ) {
    var self = Entity('upgrade',id,x,y,speedX,speedY,width,height,image);

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
    var x       = Math.random() * WIDTH;
    var y       = Math.random() * HEIGHT;
    var speedX  =  0;
    var speedY  =  0;
    var width   = 10;
    var height  = 10;

    if( Math.random()<0.5) {
        var category    = 'score';
        var image       = images.upgrade1;
    } else {
        var category    = 'attackSpeed';
        var image       = images.upgrade2;
    }

    Upgrade( id, x, y, speedX, speedY, width, height, category, image );
}

// -----------------------------------------------------------------------------
// 탄환
Bullet = function ( id, x, y, speedX, speedY, width, height ) {
    var self = Entity('bullet',id,x,y,speedX,speedY,width,height,images.bullet);
    self.lifeTime = 100;

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
        for( var key2 in enemies ) {
            /*
            var isColliding = self.testCollision( enemies[key2] );
            if( isColliding ) {
                toRemove = true;
                delete enemies[key2];
                break;
            }
            */
        }

        if( toRemove ) {
            delete delete bullets[self.id];
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
    var width   = 10;
    var height  = 10;
    Bullet( id, x, y, speedX, speedY, width, height );
}