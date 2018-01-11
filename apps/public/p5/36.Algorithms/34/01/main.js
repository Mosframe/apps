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

    title       = 'Word Interactor : 단어 인터렉터';
    subTitle    = '기본 프레임워크 설정';

    //referUrls.push({
    //    text:'',
    //    link:''
    //});

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
        createP( seed.value() );
        createP( srcTxt );
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
