// -----------------------------------------------------------------------------
// app : 서비스 시작
// -----------------------------------------------------------------------------

var DEBUG = true;

// express 생성
var express = require('express');
var app = express();

// http 서버 생성
var server = require('http').Server(app);

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
// 엔티티
// -----------------------------------------------------------------------------
var Entity = function() {
    var self = {
        id              : "",
        x               : 250,
        y               : 250,
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
    return self;
}

// -----------------------------------------------------------------------------
// 플레이어
// -----------------------------------------------------------------------------
var Player = function(id) {
    var self            = Entity();
    self.id             = id;
    self.name           = "" + Math.floor(10*Math.random());
    self.pressingDown   = false;
    self.pressingUp     = false;
    self.pressingLeft   = false;
    self.pressingRight  = false;
    self.moveSpeedMax   = 10;

    // 갱신
    var super_update = self.update;
    self.update = function() {
        self.updateMoveSpeed();
        super_update();
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
    Player.list[id] = self;
    return self;
}
// 플레이어 리스트 생성
Player.list = {};
// 접속 이벤트
Player.onConnect = function(socket) {
    // 플레이어 생성 > 등록
    var player = Player(socket.id);

    socket.on('keyPress',function(data){
        switch( data.inputId ) {
        case 'left' : player.pressingLeft   = data.state; break;
        case 'right': player.pressingRight  = data.state; break;
        case 'up'   : player.pressingUp     = data.state; break;
        case 'down' : player.pressingDown   = data.state; break;
        }
    });
}
// 접속종료 이벤트
Player.onDisconnect = function(socket) {
    delete Player.list[socket.id];
}
// 플레이어 리스트 갱신
Player.updates = function(){
    var pack = [];
    // 모든 플레이어들의 각자 변경된 위치정보를 갱신하고 패키지에 담는다.
    for( var playerId in Player.list ) {
        var player = Player.list[playerId];
        player.update();
        pack.push({
            x:player.x,
            y:player.y,
            name:player.name,
        });
    }
    return pack;
}

// -----------------------------------------------------------------------------
// 탄환
// -----------------------------------------------------------------------------
var Bullet = function(angle){
    var self = Entity();
    self.id = Math.random();
    self.moveSpeedX = Math.cos(angle/180*Math.PI) * 10;
    self.moveSpeedY = Math.sin(angle/180*Math.PI) * 10;

    self.lifeTime = 100;
    self.toRemove = false;

    var supper_update = self.update;
    self.update = function() {
        if( self.lifeTime-- <= 0) {
            self.toRemove = true;
        }
        if( self.ToRemove ) {
            delete Bullet.list[self.id];
        }
        supper_update();
    }
    Bullet.list[self.id] = self;
    return self;
}
Bullet.list = {};
Bullet.updates = function() {

    // 무작위로 탄환 생성
    if( Math.random() < 0.1 ) {
        Bullet( Math.random()*360 );
    }

    var pack = [];
    // 모든 플레이어들의 각자 변경된 위치정보를 갱신하고 패키지에 담는다.
    for( var bulletId in Bullet.list ) {
        var bullet = Bullet.list[bulletId];
        bullet.update();
        pack.push({
            x:bullet.x,
            y:bullet.y,
        });
    }
    return pack;
}


// -----------------------------------------------------------------------------

// Socket.io를 통해 WebSocket 서비스를 시작한다.
var io = require('socket.io')(server,{});
io.sockets.on('connection', function(socket){
    console.log('socket connection : '+ socket.id );
    // 소켓을 소켓DB에 등록한다.
    sockets[socket.id] = socket;
    // 플레이어 생성 및 등록
    Player.onConnect(socket);
    socket.player = Player(socket.id);
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

// 서버 틱 업데이트 : 25fps
setInterval( function(){

    // 모든 엔티티들 갱신
    var pack = {
        player:Player.updates(),
        bullet:Bullet.updates(),
    }

    // 모든 클라이언트들에게 패키지 데이터를 보낸다.
    for( var socketId in sockets ) {
        var socket = sockets[socketId];
        socket.emit( 'newPositions', pack );
    }
},1000/25);