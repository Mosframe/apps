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

    title       = 'Mad Libs Generator : 매드립스 게임 생성기';
    subTitle    = '기본 프레임워크 설정';

    referUrls.push({
        text:'Mad Libs wiki',
        link:'https://en.wikipedia.org/wiki/Mad_Libs'
    });
    referUrls.push({
        text:'tabletop',
        link:'https://github.com/jsoma/tabletop'
    });

    defaultCanvasWidth  = 400;
    defaultCanvasHeight = 400;
}

// -----------------------------------------------------------------
// 프로젝트 전용 변수들
// -----------------------------------------------------------------
var data;

var txt = '$$Exclamation$$! they said $$Adverb$$ as they jumped into their $$Noun$$ and flew off with their $$Adjective$$ $$PluralNoun$$.';

// -----------------------------------------------------------------
// 사전 작업 ( preload )
// -----------------------------------------------------------------

function awake () {

    createP(`
    _____________! they said ________ as they jumped into their _____________ and flew off with their __________ __________."
    `);
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

    // 구글시트를 읽어온다.
    // 주의 : 구글시트에서 웹으로 퍼블리싱을 해야 읽어올 수 있다.

    Tabletop.init({
        key:'1Ce-4sqdHhVKGwuU99T3HhlydQPJQMj037kJ9xocINbQ',
        callback: gotData,
        simpleSheet: true,
    });

    createButton( 'generate madlib' ).mousePressed(generate);
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


function gotData ( stuff, tabletop ) {

    //console.log(stuff);

    data = stuff;
}

function generate () {

    //createP(txt);

    // 매칭되는 변수를 데이터에서 무작위로 변경

    var madlib = txt.replace(/\$\$(.*?)\$\$/g, (match, pos)=>{
        var entry = random(data);
        return entry[pos];
    });
    createP(madlib);
}
