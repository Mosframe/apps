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

    title       = 'Attraction and Repulsion Forces : 인력과 반발력의 세력';
    subTitle    = '배열';

    referUrls.push({
        text:'',
        link:''
    });

    defaultCanvasWidth  = 400;
    defaultCanvasHeight = 400;
}

// -----------------------------------------------------------------
// 프로젝트 전용 변수들
// -----------------------------------------------------------------
var attractor;
var particles = [];

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
    //angleMode(DEGREES);
    // removeCanvas();

    attractor = createVector(200,200);
    for( var i=0; i<50; ++i ) {
        particles.push( new Particle(200,100) );
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
    // background(51);

    // 어트랙터

    stroke(255);
    strokeWeight(4);
    point(attractor.x,attractor.y);

    // 파티클

    for( var i=0; i<particles.length; ++i ) {
        var particle = particles[i];
        particle.attracted( attractor );
        particle.update();
        particle.render();
    }

}


// -----------------------------------------------------------------
// 프로젝트 전용 함수들
// -----------------------------------------------------------------
