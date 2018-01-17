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

    title       = 'Mathematical Rose Patterns : 수학적 장미 패턴';
    subTitle    = '파라메터 컨트롤';

    referUrls.push({
        text:'Rose (mathematics) wiki',
        link:'https://en.wikipedia.org/wiki/Rose_(mathematics)'
    });

    defaultCanvasWidth  = 400;
    defaultCanvasHeight = 400;
}

// -----------------------------------------------------------------
// 프로젝트 전용 변수들
// -----------------------------------------------------------------
var d;
var n;
var k;

var dSlider;
var nSlider;

// -----------------------------------------------------------------
// 사전 작업 ( preload )
// -----------------------------------------------------------------

function awake () {

    createSpan('d:').parent( canvasContainer );
    dSlider = createSlider( 0, 10, 5, 1 ).touchMoved( ()=>{
        d = dSlider.value();
    }).parent( canvasContainer );
    createSpan('n:').parent( canvasContainer );
    nSlider = createSlider( 0, 10, 8, 1 ).touchMoved( ()=>{
        n = nSlider.value();
    }).parent( canvasContainer );

    createDiv('').parent( canvasContainer );
    createButton('d=5').mousePressed(()=>{
        d = 5;
        dSlider.value(d);
    }).parent(canvasContainer);
}

// -----------------------------------------------------------------
// 프레임 갱신 시작 ( setup )
// -----------------------------------------------------------------

function start () {

    // pixelDensity(1);
    // frameRate(5);
    background(51);
    // colorMode(HSB);
    //angleMode(DEGREES);
    // removeCanvas();

    d = dSlider.value();
    n = nSlider.value();

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

    k = n / d;

    v.d = d;
    v.n = n;
    v.k = k;
}

// -----------------------------------------------------------------
// 프레임 렌더링
// -----------------------------------------------------------------

function render () {

    // noLoop();
    // colorMode(HSB);
    // frameRate(5);
    background(51);


    translate(width/2, height/2);

    beginShape();
    stroke(255);
    noFill();
    strokeWeight(1);
    for( var a=0; a<TWO_PI*d; a+=0.02 ) {
        var r = 200 * cos(k*a);
        var x = r * cos(a);
        var y = r * sin(a);
        vertex(x,y);
    }
    endShape(CLOSE);

}


// -----------------------------------------------------------------
// 프로젝트 전용 함수들
// -----------------------------------------------------------------
