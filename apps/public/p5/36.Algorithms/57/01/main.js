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

    title       = 'Butterfly Generator: 나비날개 생성기';
    subTitle    = '기본 프레임워크 설정';

    referUrls.push({
        text:'펄린 노이즈로 나비생성기',
        link:'../../../28.PerlinNoise/26/'
    });

    defaultCanvasWidth  = 200;
    defaultCanvasHeight = 200;
}

// -----------------------------------------------------------------
// 프로젝트 전용 변수들
// -----------------------------------------------------------------

var dxSlider;
var yoff = 0;


// -----------------------------------------------------------------
// 사전 작업 ( preload )
// -----------------------------------------------------------------

function awake () {

    dxSlider = createSlider(1,100,10).touchMoved(()=>{
        cx = dxSlider.value();
    }).parent( canvasContainer );
}

// -----------------------------------------------------------------
// 프레임 갱신 시작 ( setup )
// -----------------------------------------------------------------

function start () {

    // pixelDensity(1);
    // frameRate(5);
    // background(51);
    // colorMode(HSB);
    // angleMode(DEGREES);
    // removeCanvas();

    cx = dxSlider.value();

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
    // frameRate(5);
    background(51);

    push();
    translate( width/2, height/2 );
    rotate(PI/2);

    stroke(255);
    fill(255,50);
    strokeWeight(1);

    // 날개 생성

    var da = PI / 100;
    var dx = dxSlider.value()*0.01; // 0.1;

    var xoff = 0;
    beginShape();

    // 오른쪽 날개

    for( var a=-PI/2; a <= PI/2; a+= da ) {

        var n = noise(xoff,yoff);
        var r = sin(2*a) * map(n, 0, 1, 50, 100);
        var x = r * cos(a);
        var y = sin(yoff) * r * sin(a);
        xoff += dx;

        //point(x,y);
        vertex(x,y);
    }

    // 왼쪽 날개

    for( var a= PI/2; a <= 3*PI/2; a += da ) {

        var n = noise(xoff,yoff);
        var r = sin(2*a) * map(n, 0, 1, 50, 100);
        var x = r * cos(a);
        var y = sin(yoff) * r * sin(a);
        xoff -= dx;

        //point(x,y);
        vertex(x,y);
    }
    endShape();
    pop();

    yoff += 0.1;

}


// -----------------------------------------------------------------
// 프로젝트 전용 함수들
// -----------------------------------------------------------------

