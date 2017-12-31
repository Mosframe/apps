// -----------------------------------------------------------------------------
// app : 서비스 시작
// -----------------------------------------------------------------------------

var DEBUG = true;

// 웹 서비스 설정

var express = require('express');
var app     = express();
var server  = require('http').Server(app);

/*
// CORS 설정
//var cors    = require('cors');
//app.use(cors());
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    console.log(req.url);
    next();
});
*/

// MarkDown 서비스

var fs = require('fs');
var markdown = require( "markdown" ).markdown;
app.use('/', ( req, res, next ) => {

    // console.log(req.url);

    var fileName = req.url;
    if( fileName == '/Documents/' ) {
        fileName += 'README.md';
    }

    var ext = fileName.slice((Math.max(0, fileName.lastIndexOf(".")) || Infinity) + 1);

    if( ext == 'md' ) {

        console.log('markdown: '+ fileName);

        fs.readFile(__dirname + '/public'+fileName, 'utf8', (err, data) => {
            res.send( markdown.toHTML(data) );
        });

    } else {
        next();
    }
});


// Socket 서비스

var socket  = require('socket.io');
var io      = socket(server);

app.use('/p5/27.WebSocket/03', ( req, res, next ) => {

    //console.log(req.url);

    if( req.url == '/index.html') {

        io.sockets.on('connection', (socket) => {

            console.log('new connection: ' + socket.id);
        });
    }

    next();
});

app.use('/p5/27.WebSocket/04', ( req, res, next ) => {

    //console.log(req.url);

    if( req.url == '/index.html') {

        io.sockets.on('connection', (socket) => {

            console.log('new connection: ' + socket.id);

            socket.on('mouse', (data) => {

                console.log(data);

                socket.broadcast.emit('mouse',data);
                // io.sockets.emit('mouse', data); // 에코 데이터
            });
        });
    }

    next();
});

app.use('/p5/30.TwitterBot', ( req, res, next ) => {

    //console.log(req.url);

    if( req.url == '/01/index.html') {

        var bot = require('./server/p5/30.TwitterBot/01/bot.js');
        console.log(bot.serviceName + ' 01' );
        bot.run();
    }
    else
    if( req.url == '/02/index.html') {

        var bot = require('./server/p5/30.TwitterBot/02/bot.js');
        console.log(bot.serviceName + ' 02' );
       bot.run();
    }
    else
    if( req.url == '/03/index.html') {

        var bot = require('./server/p5/30.TwitterBot/03/bot.js');
        console.log(bot.serviceName + ' 03' );
       bot.run();
    }
    else
    if( req.url == '/04/index.html') {

        var bot = require('./server/p5/30.TwitterBot/04/bot.js');
        console.log(bot.serviceName + ' 04' );
       bot.run();
    }
    else
    if( req.url == '/05/index.html') {

        var bot = require('./server/p5/30.TwitterBot/05/bot.js');
        console.log(bot.serviceName + ' 05' );
       bot.run();
    }

    next();

});

// 정적 파일 서비스

app.use(express.static(__dirname + '/public'));

// 서비스 시작

server.listen(process.env.PORT || 2000);
console.log('server is running!');
