// app : 서비스 시작

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

// Socket.io를 통해 WebSocket 서비스를 시작한다.
var io = require('socket.io')(server,{});
io.sockets.on('connection', function(socket){
    console.log('socket connection');

    // 소켓객체에 속성을 추가하고 소켓 리스테에 등록한다.
    socket.id = Math.random();
    socket.x = 0;
    socket.y = 0;
    socket.name = "" + Math.floor(10*Math.random());
    sockets[socket.id] = socket;

    // 접속종료 처리
    socket.on('disconnect',function(){
        delete sockets[socket.id];
    });
});

// 서버 틱 업데이트 : 25fps
setInterval( function(){

    var pack = [];

    // 모든 클라이언트들의 각자 변경된 위치정보를 갱신하고 패키지에 담는다.
    for( var socketId in sockets ) {
        var socket = sockets[socketId];
        socket.x++;
        socket.y++;
        pack.push({
            x:socket.x,
            y:socket.y,
            name:socket.name,
        });
    }

    // 모든 클라이언트들에에 패키지 데이터를 보낸다.
    for( var socketId in sockets ) {
        var socket = sockets[socketId];
        socket.emit( 'newPositions', pack );
    }
},1000/25);