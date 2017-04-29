// -----------------------------------------------------------------------------
// entities : 엔티티 객체들
// -----------------------------------------------------------------------------

var player;

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

    self.hp             = hp            ;
    self.hpMax          = hp            ;
    self.attackSpeed    = attackSpeed   ; // 공격속도 (초당 발사량)
    self.attackCounter  =  0            ; // 공격카운터, 공격속도를 컨트롤할때 매개체로 사용한다.
    self.aimAngle       =  0            ; // 공격방향(각도)

    // 갱신
    var super_update = self.update;
    self.update = function() {
        super_update();
        self.attackCounter += self.attackSpeed;

        if( self.hp <= 0 ) {
            self.onDeath();
        }
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

        // 공격방향의 음수값을 양수값으로 변환한다.
        var aimAngle = self.aimAngle;
        if( aimAngle < 0 ) aimAngle = 360 + aimAngle;

        // 공격방향에 따른 스프라이트 번호 설정
        var directionMod = 3; // right
        if(aimAngle >= 45 && aimAngle < 135 ) // down
            directionMod = 2;
        else if(aimAngle >= 135 && aimAngle < 225 ) // left
            directionMod = 1;
        else if(aimAngle >= 225 && aimAngle < 315 ) // up
            directionMod = 0;

        // 스프라이트에서 정면 이미지 그리기
        var frameWidth  = self.image.width/3;
        var frameHeight = self.image.height/4;
        ctx.drawImage(self.image,0,directionMod*frameHeight,frameWidth,frameHeight,x,y,width,height);
        ctx.restore();
    }
    // 죽음
    self.onDeath = function() {}
    // 공격 수행
    self.performAttack = function() {
        // 탄환 생성
        if( self.attackCounter > 25 ) { // 매 1초마다
            self.attackCounter = 0;
            Bullet.generate(self);
        }
    }
    // 특수 공격 수행
    self.performSpecialAttack = function(){
        // 탄환 생성
        if( self.attackCounter > 50 ) {

            // 3연발 탄환 생성
            Bullet.generate(self, self.aimAngle - 5);
            Bullet.generate(self, self.aimAngle);
            Bullet.generate(self, self.aimAngle + 5);
            // 방사형 탄환 생성
            //for( var angle=0; angle < 360; angle++ ){
            //    Bullet.generate(self, angle);
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

        if( self.pressingMouseLeft ) {
            self.performAttack();
        }
        if( self.pressingMouseRight ) {
            self.performSpecialAttack();
        }
    }
    // 죽음
    self.onDeath = function() {
        var timeSurvived = Date.now() - timeWhenGameStarted;
        console.log("You lost! | 플레이 시간 " + timeSurvived + " ms." );
        startNewGame();
    }

    // 이동 4방향키가 눌려있는지..
    self.pressingDown    = false;
    self.pressingUp      = false;
    self.pressingLeft    = false;
    self.pressingRight   = false;

    // 마우스 버튼이 눌려있는지...
    self.pressingMouseLeft  = false;
    self.pressingMouseRight = false;

    return self;
}

// -----------------------------------------------------------------------------
// 적군
Enemy = function ( id, x, y, width, height, image, hp, attackSpeed ) {
    var self = Actor('enemy',id,x,y,width,height,image,hp,attackSpeed );
    self.toRemove   = false;
    Enemy.list[id]  = self;

    // 갱신
    var super_update = self.update;
    self.update = function() {
        super_update();
        self.performAttack();
        self.updateAim();
    }
    // 렌더링
    var super_draw = self.draw;
    self.draw = function() {
        super_draw();

        // 생명력바 그리기
        var x = self.x - player.x + WIDTH/2;
        var y = self.y - player.y + HEIGHT/2 - self.height/2 - 20;
        ctx.save();
        ctx.fillStyle = 'red';
        var width = 100*self.hp/self.hpMax;
        if( width < 0 ) width = 0;
        ctx.fillRect( x-50, y, width, 10 );
        ctx.strokeStyle = 'black';
        ctx.strokeRect( x-50, y, 100, 10 );

        ctx.restore();
    }
    // 총구 방향 갱신
    self.updateAim = function() {

        var diffX = player.x - self.x;
        var diffY = player.y - self.y;

        // Math.atan2(y,x) : (y/x)점의 각도를 라디안 단위로 계산하여 반환한다. : 반환범위 (atan -PI/2~PI/2, atan2는 -PI~PI)
        self.aimAngle = Math.atan2(diffY,diffX) / Math.PI * 180;
    }
    // 죽음
    self.onDeath = function() {
        self.toRemove = true;
    }
    // 위치 갱신
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
}
Enemy.list = {};
// 적군 갱신
Enemy.update = function() {
    // 생성
    if( frameCount % 100 === 0 ) // 4초 마다 = 100/25fps
        Enemy.randomlyGenerate();
    // 갱신
    for( var key in Enemy.list ) {
        Enemy.list[key].update();
    }
    // 죽음
    for( var key in Enemy.list ) {
        if( Enemy.list[key].toRemove ) {
            delete Enemy.list[key];
        }
    }
}
// 무작위로 적군 생성
Enemy.randomlyGenerate = function() {
    var id      = Math.random();
    var x       = Math.random() * currentMap.width;
    var y       = Math.random() * currentMap.height;
    var width   = 64;
    var height  = 64;
    if( Math.random() < 0.5 ) {
        Enemy( id, x, y, width, height, images.bat, 2, 1 );
    } else {
        Enemy( id, x, y, width, height, images.bee, 1, 3 );
    }
}

// -----------------------------------------------------------------------------
// 강화 아이템
Upgrade = function ( id, x, y, width, height, category, image ) {
    var self = Entity('upgrade',id,x,y,width,height,image);
    self.category   = category;
    Upgrade.list[id]= self;

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
            delete Upgrade.list[self.id];
        }
    }
}
Upgrade.list = {};
// 강화 아이템 갱신
Upgrade.update = function() {
    // 생성
    if( frameCount % 75 === 0 ) // 3초 마다 = 75/25fps
        Upgrade.randomlyGenerate();
    // 갱신
    for( var key in Upgrade.list ) {
        Upgrade.list[key].update();
    }
}
// 무작위로 강화 아이템 생성
Upgrade.randomlyGenerate = function() {
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
    self.lifeTime   = 100;
    self.combatType = combatType;
    self.speedX     = speedX;
    self.speedY     = speedY;
    Bullet.list[id] = self;

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
            for( var key2 in Enemy.list ) {
                if( self.testCollision( Enemy.list[key2] ) ) {
                   toRemove = true;
                    Enemy.list[key2].hp -= 1;
                }
            }
        } else if( self.combatType === 'enemy' ) {
            if( self.testCollision( player ) ) {
                toRemove = true;
                player.hp -= 1;
            }
        }

        if( toRemove ) {
            delete delete Bullet.list[self.id];
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
}
Bullet.list = {};
// 탄환 갱신
Bullet.update = function() {
    // 갱신
    for( var key in Bullet.list ) {
        Bullet.list[key].update();
    }
}
// 탄환 생성
Bullet.generate = function( actor, overwriteAngle ) {
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

