/**
 * main.js
 *
 * p5.js    : http://p5js.org/reference
 * web      : http://developer.mozilla.org
 * @author  : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 환경설정 변수들 설정
// -----------------------------------------------------------------

function description () {

    title       = 'Social Media Data Visualization : 소셜미디어 데이터 시각화';
    subTitle    = '기본 프레임워크 설정';

    referUrls.push({
        text:'',
        link:''
    });


    defaultCanvasWidth  = 600;
    defaultCanvasHeight = 400;
}

// -----------------------------------------------------------------
// 프로젝트 전용 변수들
// -----------------------------------------------------------------
var potus;
var counts = {};

var ignore = {
    "the"   :'true',
    "to"    :'true',
    "we"    :'true',
    "of"    :'true',
    "and"   :'true',
    "a"     :'true',
    "http"  :'true',
    "https" :'true',
    "our"   :'true',
};

// -----------------------------------------------------------------
// 사전 작업 ( preload )
// -----------------------------------------------------------------

function awake () {

    //potus = loadJSON('potus.json');
    potus = loadJSON('flotus.json');
}

// -----------------------------------------------------------------
// 프레임 갱신 시작 ( setup )
// -----------------------------------------------------------------

function start () {

    // pixelDensity(1);
    // frameRate(5);
    background(0);
    // colorMode(HSB);
    // angleMode(DEGREES);
    // removeCanvas();

    //console.log(potus);

    // 데이터 월별로 정렬

    var tweets = potus.tweets;
    for( var i=0; i<tweets.length; ++i ) {

        var date = new Date(tweets[i].timestamp);
        var month = date.getMonth();
        var year = date.getFullYear();
        var key = month + '/' + year;

        if( counts.hasOwnProperty(key) ) {
            ++counts[key].total;
        } else {
            counts[key] = {
                total: 1,
                words: {}
            }
        }

        // 단어 카운트

        var txt = tweets[i].text;
        var words = txt.split(/\W+/);
        for( var j=0; j<words.length; ++j ) {
            var word = words[j].toLowerCase();
            if( word.length > 0 ) {
                if( counts[key].words.hasOwnProperty(word) ) {
                    ++counts[key].words[word];
                } else {
                    counts[key].words[word] = 1;
                }
            }
        }
    }

    var months = Object.keys(counts);
    months.reverse();

    // 최고 트위이 많은 월 얻기

    var maxtweets = 0;
    for( var i=0; i<months.length; ++i ) {
        var month = months[i];
        var num = counts[month].total;
        if( num > maxtweets ) {
            maxtweets = num;
        }
    }

    // 그래프 드로잉

    var w = width / months.length;

    for( var i=0; i<months.length; ++i ) {

        var month = months[i];
        var num = counts[month].total;
        var h = map( num, 0, maxtweets, 0, 300 );
        fill(200);
        rect(i*w,height-h,w-1,h);

        var wordCounts = counts[month].words;
        var words = Object.keys(wordCounts);

        //  가장 많은 단어 찾기

        var biggest = 0;
        var biggestWord = '';
        for( var j=0; j<words.length; ++j ) {
            var word = words[j];
            if( wordCounts[word] > biggest && !ignore[word] && word.length > 3 ) {
                biggest = wordCounts[word];
                biggestWord = word;
            }
        }

        // 가장 많은 단어 드로잉

        fill(255);
        text( biggestWord, i*w, height-h-5 );
    }

 }

// -----------------------------------------------------------------
// 입력
// -----------------------------------------------------------------

function keyPressed () {

}

function  keyReleased () {

}

// -----------------------------------------------------------------
// 프레임 갱신
// -----------------------------------------------------------------

function update () {


}

// -----------------------------------------------------------------
// 프레임 렌더링
// -----------------------------------------------------------------

function render () {

    // noLoop();
    // colorMode(HSB);
    // background( 0 );

}


// -----------------------------------------------------------------
// 프로젝트 전용 함수들
// -----------------------------------------------------------------

