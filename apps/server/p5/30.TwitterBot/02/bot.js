/**
 * bot.js
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 * Twitter 패키지 : https://github.com/ttezel/twit
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 변수, 오브젝트 정의
// -----------------------------------------------------------------

function run () {

    var Twit    = require('twit')
    var config  = require('../config');
    var T       = new Twit( config );

    //tweetIt();
    setInterval(tweetIt, 1000*20);

    // 트윗 전송

    function tweetIt () {

        var r = Math.floor(Math.random()*100);

        var tweet = {
            status:`[${r}] #mosframe / tweet bot 에서 트윗`,
        };

        T.post( 'statuses/update', tweet, tweeted );

        function tweeted ( err, data, response ) {

            if(err) {
                console.log('트윗 전송 에러 발생 : ' + err.message );
            } else {
                console.log("트윗 성공 : " + data );
            }
        }
    }
}


module.exports = {
    serviceName: "twitter bot",
    run: run,
}