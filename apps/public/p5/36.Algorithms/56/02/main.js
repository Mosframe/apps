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

    title       = 'Steering Behaviors: 스티어링 동작, 텍스트 입자조정';
    subTitle    = '마우스 포지션에서 반발력 발생';

    referUrls.push({
        text:'',
        link:''
    });

    defaultCanvasWidth  = 600;
    defaultCanvasHeight = 300;
}

// -----------------------------------------------------------------
// 프로젝트 전용 변수들
// -----------------------------------------------------------------
var font;
var vehicles = [];


// -----------------------------------------------------------------
// 사전 작업 ( preload )
// -----------------------------------------------------------------

function awake () {

    font = loadFont('../../../../Fonts/AvenirNextLTPro-Demi.otf');
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

    //textFont(font);
    //textSize(192);
    //fill(255);
    //noStroke();
    //text('train', 100, 200);

    var points = font.textToPoints( 'train', 100, 200, 192 );

    for( var i=0; i<points.length; ++i ) {
        var pt = points[i];
        var vehicle =new Vehicle(pt.x,pt.y);
        vehicles.push(vehicle);
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
    // frameRate(5);
    background(51);

    for( var i=0; i<vehicles.length; ++i ) {
        var v = vehicles[i];
        v.behaviors();
        v.update();
        v.render();
    }

}


// -----------------------------------------------------------------
// 프로젝트 전용 함수들
// -----------------------------------------------------------------

