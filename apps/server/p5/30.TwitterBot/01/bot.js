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

    /*
    //
    //  tweet 'hello world!'
    //
    for( var c=0; c<10; ++c ) {

        T.post('statuses/update', { status: `hello world! (${c})` }, function(err, data, response) {
            console.log(data)
        });

    }
    */

    /*
    //
    //  search twitter for all tweets containing the word 'banana' since July 11, 2011
    //
    T.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function(err, data, response) {
        console.log(data)
    });
    */

    // 검색

    var params = {
        q:'rainbow',
        count: 2
    };

    T.get('search/tweets', params, ( err, data, response ) => {

        //console.log(data);

        var tweets = data.statuses;

        for( var i=0; i<tweets.length; ++i ) {
            console.log(tweets[i].text);
        }
    });
}


module.exports = {
    serviceName: "twitter bot",
    run: run,
}
