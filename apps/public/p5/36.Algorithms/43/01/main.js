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

    title       = 'Asteroids : 운석 파괴 게임';
    subTitle    = '기본 프레임워크 설정';

    referUrls.push({
        text:'Asteroids (video game)',
        link:'https://en.wikipedia.org/wiki/Asteroids_(video_game'
    });


    defaultCanvasWidth  = 600;
    defaultCanvasHeight = 600;
}

// -----------------------------------------------------------------
// 프로젝트 전용 변수들
// -----------------------------------------------------------------
var ship;
var asteroids = [];

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
    // background(0);
    // colorMode(HSB);
    // angleMode(DEGREES);
    // removeCanvas();

    ship = new Ship();
    for( var i=0; i<5; ++i ) {
        asteroids.push( new Asteroid() );
    }
 }

// -----------------------------------------------------------------
// 키 입력
// -----------------------------------------------------------------

function keyPressed () {

    if( keyCode == RIGHT_ARROW ) {
        ship.setRotation(0.1);
    }
    else
    if( keyCode == LEFT_ARROW ) {
        ship.setRotation(-0.1);
    }
    else
    if( keyCode == UP_ARROW ) {
        ship.boosting(true);
    }
}

function  keyReleased () {

    ship.setRotation(0);
    ship.boosting(false);
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

    // 우주선

    ship.render();
    ship.turn();
    ship.update();
    ship.edges();

    // 운석들

    for( var i=0; i<asteroids.length; ++i ) {
        asteroids[i].render();
        asteroids[i].update();
        asteroids[i].edges();
    }

}


// -----------------------------------------------------------------
// 프로젝트 전용 함수들
// -----------------------------------------------------------------

