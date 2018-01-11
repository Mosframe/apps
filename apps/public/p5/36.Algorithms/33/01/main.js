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

    title       = 'Diastic Machine : 다이아스틱 머신 : 소스 텍스트에서 시를 만드는 알고리즘';
    subTitle    = '기본 프레임워크 설정';

    referUrls.push({
        text:'Jackson Mac Low',
        link:'https://en.wikipedia.org/wiki/Jackson_Mac_Low'
    });
    referUrls.push({
        text:'Virtual Muse: Experiments in Computer Poetry (Wesleyan Poetry Series) Paperback',
        link:'https://www.amazon.com/Virtual-Muse-Experiments-Computer-Wesleyan/dp/0819522392/ref=as_li_ss_tl?ie=UTF8&linkCode=sl1&tag=natureofcode-20&linkId=e7ab68c6a8876eeaf5371d45f756fb81'
    });

    defaultCanvasWidth  = 400;
    defaultCanvasHeight = 400;
}

// -----------------------------------------------------------------
// 프로젝트 전용 변수들
// -----------------------------------------------------------------
var srcTxt;
var words;

// -----------------------------------------------------------------
// 사전 작업 ( preload )
// -----------------------------------------------------------------

function awake () {

    createButton('sin').mousePressed(()=>{
        mode = 0;
    });
    createButton('noise').mousePressed(()=>{
        mode = 1;
    });

    createP('seed: <input id="seed" value="test"</input><button id="submit">submit</button>');

    srcTxt = loadStrings('source.txt');
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

    srcTxt = join( srcTxt, '' );
    words = splitTokens( srcTxt, ' ,!.?' ); // 단어 단위로 분리

    var seed    = select('#seed');
    var submit  = select('#submit');
    submit.mousePressed( ()=>{
        //createP( seed.value() );
        //createP( srcTxt );
        var phrase = diastic( seed.value(), words );
        createP( phrase );
    });
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

// 시 생성

function diastic( seed, words ) {

    var phrase = '';
    var currWord = 0;

    for( var i=0; i<seed.length; ++i ) {
        var c = seed.charAt(i);

        for( var j=currWord; j<words.length; ++j ) {
            if( words[j].charAt(i) == c ) {
                //console.log(words[j]);
                phrase += words[j] + ' ';
                currWord = j + 1; // 찾은 단어는 패스한다.
                break;
            }
        }
    }
    return phrase;
}