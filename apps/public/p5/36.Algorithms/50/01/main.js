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

    title       = 'Lévy Flight (Random Walker) : 레비 비행 (무작위 걷기)';
    subTitle    = '벡터를 이용한 랜덤워커로 프랑스의 수학자 Paul Lévy가 만듬,임의의 자연 현상에 대한 확률 론적 측정 및 시뮬레이션';

    referUrls.push({
        text:'Lévy flight wiki',
        link:'https://en.wikipedia.org/wiki/L%C3%A9vy_flight'
    });


    defaultCanvasWidth  = 400;
    defaultCanvasHeight = 400;
}

// -----------------------------------------------------------------
// 프로젝트 전용 변수들
// -----------------------------------------------------------------
var pos;
var prev;

// -----------------------------------------------------------------
// 사전 작업 ( preload )
// -----------------------------------------------------------------

function awake () {

}

// -----------------------------------------------------------------
// 프레임 갱신 시작 ( setup )
// -----------------------------------------------------------------

function start () {

    // pixelDensity(1);
    // frameRate(5);
    background(51);
    // colorMode(HSB);
    // angleMode(DEGREES);
    // removeCanvas();

    pos = createVector(width/2,height/2);
    prev = pos.copy();

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
    // background(0);

    stroke(255);
    strokeWeight(2);
    //point(pos.x,pos.y);
    line(pos.x,pos.y,prev.x,prev.y);
    prev.set(pos);

    var step = p5.Vector.random2D();

    var r = random(100);
    if( r < 1 ) {
        step.mult(random(25,100));
    } else {
        step.setMag(2);
    }

    pos.add(step);


    pos.x = constrain(pos.x,0,width-1);
    pos.y = constrain(pos.y,0,height-1);

}


// -----------------------------------------------------------------
// 프로젝트 전용 함수들
// -----------------------------------------------------------------
