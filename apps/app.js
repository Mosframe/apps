// -----------------------------------------------------------------------------
// app : 서비스 시작
// -----------------------------------------------------------------------------

var DEBUG = true;




// [ 웹 서비스 설정 ]

// express 생성
var express = require('express');
var app = express();

// http 서버 생성
var server = require('http').Server(app);

// 홈 서비스 : http://mywebsite:2000 => http://mywebsite:2000/client/assets/index.html
app.get('/', function( req, res ) {
    res.sendFile(__dirname + '/client/assets/index.html');
});


// [ MarkDown 서비스 ]

var fs = require('fs');
var markdown = require( "markdown" ).markdown;
app.use('/client/Documents', function( req, res ){
    fs.readFile(__dirname + '/client/assets/Documents'+req.url, 'utf8', function(err, data) {
        res.send( markdown.toHTML(data) );
    });
});

// [ Static 서비스 ]

// 서버소스를 보호하기 위해 /client/assets 디렉토리 이하만 클라이언트에 서비스한다.
// http://mywebsite:2000/client => http://mywebsite:2000/client/assets
// ex) /server/secureFile.js 파일은 클라이언트에 노출되지 않는다.
app.use('/', express.static(__dirname + '/client/assets/'));



// [ 서비스 시작 ]

// Http서버에서 2000 포트를 통해서 클라이언트 요청을 받는다.
//server.listen(2000);
server.listen(process.env.PORT || 2000);
console.log('server started');
