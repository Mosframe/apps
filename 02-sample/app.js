// -----------------------------------------------------------------------------
// app : 서비스 시작
// -----------------------------------------------------------------------------

var DEBUG = true;

// db커넥션 생성
var mongojs = require('mongojs');
var db = mongojs('localhost:27017/Unicon',['account','progress']);

// express 생성
var express = require('express');
var app = express();

// http 서버 생성
var server = require('http').Server(app);

// util
var util = require('./util');

// 홈 서비스 : http://mywebsite:2000 => http://mywebsite:2000/client/assets/index.html
app.get('/', function( req, res ) {
    res.sendFile(__dirname + '/client/assets/index.html');
});

// 서버소스를 보호하기 위해 /client/assets 디렉토리 이하만 클라이언트에 서비스한다.
// http://mywebsite:2000/client => http://mywebsite:2000/client/assets
// ex) /server/secureFile.js 파일은 클라이언트에 노출되지 않는다.
app.use('/client', express.static(__dirname + '/client/assets/'));

// Http서버에서 2000 포트를 통해서 클라이언트 요청을 받는다.
server.listen(2000);
console.log('server started');
var sockets = {};

// -----------------------------------------------------------------------------
// Socket.io를 통해 WebSocket 서비스를 시작한다.
// -----------------------------------------------------------------------------
var io = require('socket.io')(server,{});
io.sockets.on('connection', function(socket){
    console.log('socket connection : '+ socket.id );

    // 소켓을 소켓DB에 등록한다.
    sockets[socket.id] = socket;

    // 로그인
    socket.on('reqSignIn',function(data){
        isValidPassword( data, function(err,res) {
            var success = false;
            if( res || DEBUG ) {
                // 플레이어 생성 및 등록
                Player.onConnect(socket);
                socket.player = Player.list[socket.id];
                success = true;
            }
            socket.emit('resSignIn', {err:err,success:success} );
        });
    });
    // 회원가입
    socket.on('reqSignUp',function(data){
        addMember(data,function(err,res){
            socket.emit('resSignUp', {err:err,success:res} );
        });
    });
    // 채팅 입력 처리
    socket.on('sendChat',function(data){
        var playerName = socket.player.name;
        for( var i in sockets ) {
            sockets[i].emit('addChat', playerName + ' : ' + data );
        }
    });
    // 명령 실행
    // TODO : 서버 해킹(데이터베이스를 조작하거나 삭제하는등...)이 가능할 수 있으므로 아무에게나 허용되지 않도록 서비스 전에 반드시 삭제하거나 관리자만 허용되도록 개선해야 한다.
    socket.on('reqEval',function(data){
        if( !DEBUG ) return;

        var res = eval(data); // eval() 자바스크립트 코드를 계산하고 실행한다. (https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/eval)
        socket.emit('resEval', res );
    });
    // 접속종료 처리
    socket.on('disconnect',function(){
        delete sockets[socket.id];
        Player.onDisconnect(socket);
    });
});

// -----------------------------------------------------------------------------
// 데이터베이스
// -----------------------------------------------------------------------------
// 비밀번호가 일치하는가?
var isValidPassword = function( data, callback ) {
    db.account.find({username:data.username,password:data.password},function(err,res){
        var success = false;
        if( err )
            console.error( err );
        else
            if( res.length > 0 )
                success = true;
        callback( err, success );
    });
};
// 회원이 맞는가?
var isMember = function( data, callback ) {
    db.account.find({username:data.username},function(err,res){
        var success = false;
        if( err )
            console.error( err );
        else
            if( res.length > 0 )
                 success = true;
        callback( err, success );
    });
};
// 회원 등록
var addMember = function( data, callback ) {
    // 이미 등록된 회원이 있는가?
    isMember( data, function(err,res) {
        if( res )
            callback( err, false );
        else {
            db.account.insert({username:data.username,password:data.password},function(err) {
                var success = false;
                if( err )
                    console.error( err );
                else
                    success = true;
                callback( err, success );
            });
        }
    });
};


// -----------------------------------------------------------------------------
// 엔티티
// -----------------------------------------------------------------------------
var Entity = function() {
    var self = {
        id              : "",
        x               : 250,
        y               : 250,
        width           : 20,
        height          : 20,
        moveSpeedX      : 0,
        moveSpeedY      : 0,
    }
    // 갱신
    self.update = function () {
        self.updatePosition();
    }
    // 위치 갱신
    self.updatePosition = function() {
        self.x += self.moveSpeedX;
        self.y += self.moveSpeedY;
    }
    // 타겟과의 거리값을 구한다.
    self.getDistance = function ( target ) {
        var vx = self.x - target.x;
        var vy = self.y - target.y;
        return Math.sqrt( vx*vx + vy*vy );
    }
    // 타겟과 충돌했는지 알아낸다.
    self.testCollision = function ( target ) {
        var rect1 = {
            x:self.x-self.width/2,
            y:self.y-self.height/2,
            width:self.width,
            height:self.height,
        }
        var rect2 = {
            x:target.x-target.width/2,
            y:target.y-target.height/2,
            width:target.width,
            height:target.height,
        }
        return util.testCollisionRect2( rect1, rect2 );
    }
    return self;
}


// -----------------------------------------------------------------------------
// 플레이어
// -----------------------------------------------------------------------------
var Player = function(id) {
    var self                    = Entity();
    self.id                     = id;
    self.x                      = Math.random() * (500-100) + 50;
    self.y                      = Math.random() * (500-100) + 50;
    self.width                  = 18*2,
    self.height                 = 25*2,
    self.name                   = "" + Math.floor(10*Math.random());
    self.pressingLeft           = false;
    self.pressingRight          = false;
    self.pressingUp             = false;
    self.pressingDown           = false;
    self.pressingAttack         = false;
    self.pressingSpecialAttack  = false;
    self.attackAngle            = 0;
    self.moveSpeedMax           = 10;
    self.hp                     = 10;
    self.hpMax                  = 10;
    self.score                  = 0;

    // 갱신
    var super_update = self.update;
    self.update = function() {
        self.updateMoveSpeed();
        super_update();

        // 탄환 생성
        if( self.pressingAttack ) {
            self.shootBullet( self.attackAngle, 30 )
        }
        // 특수 탄환 생성
        if( self.pressingSpecialAttack ) {
            // 7발 발사
            for( var c=-3; c<4; ++c ) {
                self.shootBullet( c*10 + self.attackAngle, 10 )
            }
        }
    }

    // 총알 발사
    self.shootBullet = function(angle,lifeTime) {
        var bullet = Bullet( self, angle );
        bullet.x = self.x;
        bullet.y = self.y;
        bullet.lifeTime = lifeTime;
    }

    // 이동속도 갱신
    self.updateMoveSpeed = function() {
        // 이동
        if( self.pressingRight ) {
            self.moveSpeedX = self.moveSpeedMax;
        } else if( self.pressingLeft ) {
            self.moveSpeedX =-self.moveSpeedMax;
        } else {
            self.moveSpeedX = 0;
        }
        if( self.pressingDown ) {
            self.moveSpeedY = self.moveSpeedMax;
        } else if( self.pressingUp ) {
            self.moveSpeedY =-self.moveSpeedMax;
        } else {
            self.moveSpeedY = 0;
        }
    }
    // 생성 패킷 얻기
    self.getCreatePack = function() {
        return {
            id      : self.id,
            x       : self.x,
            y       : self.y,
            width   : self.width,
            height  : self.height,
            name    : self.name,
            hp      : self.hp,
            hpMax   : self.hpMax,
            score   : self.score,
        };
    }
    // 갱신 패킷 얻기
    self.getUpdatePack = function() {
        return  {
            id      : self.id,
            x       : self.x,
            y       : self.y,
            hp      : self.hp,
            score   : self.score,
        }
    }
    Player.list[id] = self;
    createPack.players.push( self.getCreatePack() );
    return self;
}
// 플레이어 리스트 생성
Player.list = {};
// 접속 이벤트
Player.onConnect = function(socket) {
    // 플레이어 생성 > 등록
    var player = Player(socket.id);

    // 플레이어 입력 처리
    socket.on('keyPress',function(data){
        //console.log(data.inputId);
        switch( data.inputId ) {
        case 'left'         : player.pressingLeft           = data.state; break;
        case 'right'        : player.pressingRight          = data.state; break;
        case 'up'           : player.pressingUp             = data.state; break;
        case 'down'         : player.pressingDown           = data.state; break;
        case 'attack'       : player.pressingAttack         = data.state; break;
        case 'specialAttack': player.pressingSpecialAttack  = data.state; break;
        case 'attackAngle'  : player.attackAngle            = data.state; break;
        }
    });

    // 서버에 존재하는 엔티티 정보들을 클라이언트에 모두 전송해 준다.
    socket.emit('create',{
        myId:socket.id,
        players:Player.getCreatePacks(),
        bullets:Bullet.getCreatePacks(),
    });
}
// 모든 플레이어 생성팩을 얻는다.
Player.getCreatePacks = function() {
    var pack = [];
    for( var playerId in Player.list ) {
        pack.push( Player.list[playerId].getCreatePack() );
    }
    return pack;
}

// 접속종료 이벤트
Player.onDisconnect = function(socket) {
    delete Player.list[socket.id];
    removePack.players.push(socket.id);
}
// 플레이어 리스트 갱신
Player.updates = function(){
    var pack = [];
    // 모든 플레이어들의 각자 변경된 위치정보를 갱신하고 패키지에 담는다.
    for( var playerId in Player.list ) {
        var player = Player.list[playerId];
        player.update();
        pack.push( player.getUpdatePack() );
    }
    return pack;
}

// -----------------------------------------------------------------------------
// 탄환
// -----------------------------------------------------------------------------
var Bullet = function(owner,angle){
    var self        = Entity();
    self.id         = Math.random();
    self.width      = 20,
    self.height     = 20,
    self.moveSpeedX = Math.cos(angle/180*Math.PI) * 10;
    self.moveSpeedY = Math.sin(angle/180*Math.PI) * 10;
    self.owner      = owner;
    self.lifeTime   = 30;
    self.toRemove   = false;

    // update
    var supper_update = self.update;
    self.update = function() {
        if( self.lifeTime-- <= 0) {
            self.toRemove = true;
        }
        supper_update();

        for( var i in Player.list ) {
            var player = Player.list[i];
            if( self.owner !== player && self.testCollision(player) ) {
                player.hp -= 1;
                if( player.hp <= 0 ) {
                    player.hp = player.hpMax;
                    player.x = Math.random() * (500-100) + 50;
                    player.y = Math.random() * (500-100) + 50;

                    if( self.owner ) self.owner.score += 1;
                }
                self.toRemove = true;
            }
        }
    }
    // 생성 패킷 얻기
    self.getCreatePack = function() {
        return {
            id      : self.id,
            x       : self.x,
            y       : self.y,
            width   : self.width,
            height  : self.height,
        };
    }
    // 갱신 패킷 얻기
    self.getUpdatePack = function() {
        return  {
            id  : self.id,
            x   : self.x,
            y   : self.y,
        }
    }

    Bullet.list[self.id] = self;
    createPack.bullets.push( self.getCreatePack() );
    return self;
}
Bullet.list = {};
Bullet.updates = function() {
    var pack = [];
    // 모든 플레이어들의 각자 변경된 위치정보를 갱신하고 패키지에 담는다.
    for( var bulletId in Bullet.list ) {
        var bullet = Bullet.list[bulletId];
        bullet.update();
        if( bullet.toRemove ) {
            delete Bullet.list[bulletId];
            removePack.bullets.push(bullet.id);
        } else
            pack.push( bullet.getUpdatePack() );
    }
    return pack;
}
// 모든 총알 생성팩을 얻는다.
Bullet.getCreatePacks = function() {
    var pack = [];
    for( var bulletId in Bullet.list ) {
        pack.push( Bullet.list[bulletId].getCreatePack() );
    }
    return pack;
}

// -----------------------------------------------------------------------------

var createPack  = {players:[],bullets:[]};
var removePack  = {players:[],bullets:[]};

// 서버 틱 업데이트 : 25fps
setInterval( function(){

    // 모든 엔티티들 갱신하고 변경된 패킷들을 리턴한다.
    var updatePack = {
        players:Player.updates(),
        bullets:Bullet.updates(),
    }

    // 모든 클라이언트들에게 패키지 데이터를 보낸다.
    for( var socketId in sockets ) {
        var socket = sockets[socketId];
        socket.emit( 'create'   , createPack );
        socket.emit( 'update'   , updatePack );
        socket.emit( 'remove'   , removePack );
    }

    // 보내진 모든 팩들은 초기화 한다.
    createPack.players  = [];
    createPack.bullets  = [];
    removePack.players  = [];
    removePack.bullets  = [];

},1000/25);