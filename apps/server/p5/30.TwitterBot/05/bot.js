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

    var stream = T.stream('user');

    stream.on('follow', tweetFollowed); // 팔로우 이벤트 리슨
    stream.on('tweet', tweetEvent);

    tweetIt({status:'test'});
    //setInterval( tweetIt, 1000*20 );
    //tweetSketch();

    // 트윗 이벤트 수신

    function tweetEvent ( event ) {

        //console.log(event);
        //var fs = require('fs');
        //var json = JSON.stringify(event,null,2);
        //fs.writeFile(__dirname + '/tweet.json', json);

        var replyto = event.in_reply_to_screen_name;
        var text = event.text;
        var from = event.user.screen_name;

        console.log( replyto + ' ' + from );

        // 나에게 트윗한 유저에게 응답하기

        if( replyto === 'mosframe' ) {
            var newTweet = `@${from} thank you for tweeting me!`;
            tweetIt({status:newTweet});
        }
    }

    // 스케치 트윗하기

    function tweetSketch () {

        var exec = require('child_process').exec;
        var cmd = `processing-java --sketch=${__dirname}/sketch --run`;

        exec( cmd, ()=>{

            //console.log('스케치 완료');

            var fs = require('fs');
            var params = {
                encoding: 'base64'
            };
            var filename = `${__dirname}/sketch/output.png`;
            var sketchData = fs.readFileSync(filename,params);
            T.post( 'media/upload', {media_data:sketchData}, (err,data,response)=>{
                if(err) {
                    console.log('트윗 업로드 에러 발생 : ' + err.message );
                } else {
                    console.log("트윗 업로드 성공 : " + filename );

                    var id = data.media_id_string;
                    var tweet = {
                        status:`This is my live sketch`,
                        media_ids: [id]
                    };

                    tweetIt( tweet );
                }
            });
        });
    }

    // 팔로잉 이벤트 수신

    function tweetFollowed ( event ) {

        var name        = event.source.name;
        var screenName  = event.source.screen_name;

        console.log("Follow :" + screenName);

        var tweet = {
            status:'.@' + screenName + ' do you like smartphone game?',
        };

        tweetIt( tweet );
    }


    // 트윗 전송

    function tweetIt (tweet) {

        if( tweet.status ) {
            tweet.status += ' | #mosframe tweet bot | ' + Date.now();
        }

        T.post( 'statuses/update', tweet, tweeted );

        function tweeted ( err, data, response ) {

            if(err) {
                console.log('트윗 전송 에러 발생 : ' + err.message );
            } else {
                console.log("트윗 성공 : " );
            }
        }
    }
}


module.exports = {
    serviceName: "twitter bot",
    run: run,
}
