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

    title       = 'Word Counter : 단어 카운터';
    subTitle    = '기본 프레임워크 설정';

    //referUrls.push({
    //    text:'Mad Libs wiki',
    //    link:'https://en.wikipedia.org/wiki/Mad_Libs'
    //});
    //referUrls.push({
    //    text:'tabletop',
    //    link:'https://github.com/jsoma/tabletop'
    //});

    defaultCanvasWidth  = 400;
    defaultCanvasHeight = 400;
}

// -----------------------------------------------------------------
// 프로젝트 전용 변수들
// -----------------------------------------------------------------
var txt;
var counts = {};
var keys = [];

// -----------------------------------------------------------------
// 사전 작업 ( preload )
// -----------------------------------------------------------------

function awake () {

    txt = loadStrings('rainbow.txt');
}

// -----------------------------------------------------------------
// 프레임 갱신 시작
// -----------------------------------------------------------------

function start () {

    // pixelDensity(1);
    //frameRate(5);
    background(0);
    //colorMode(HSB);
    // angleMode(DEGREES);
    removeCanvas();

    var allwords = txt.join('\n');
    var tokens = allwords.split(/\W+/);
    // console.log( tokens );

    // 숫자가 아닌 단어만 카운트한다.

    if( !/\d+/.test(word) ) {

        for( var i=0; i<tokens.length; ++i ) {
            var word = tokens[i].toLowerCase();
            if( counts[word] === undefined ) {
                counts[word] = 1;
                keys.push(word);
            } else {
                ++counts[word];
            }
        }
    }

    // 정렬

    // keys.sort();
    keys.sort((a,b)=>{
        var countA = counts[a];
        var countB = counts[b];
        return countB-countA;
    });

    // 출력

    for( var i=0; i<keys.length; ++i ) {
        var key = keys[i];
        createDiv(key + ' ' + counts[key] );
    }

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
    background( 0 );

}

// -----------------------------------------------------------------
// 프로젝트 전용 함수들
// -----------------------------------------------------------------
