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
    subTitle    = '발사,파괴,회피';

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
var lasers = [];

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

    if( key == ' ' ) {
        lasers.push( new Laser(ship.pos,ship.heading) );
    }
    else
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

    // 운석들

    for( var i=0; i<asteroids.length; ++i ) {

        var asteroid = asteroids[i];

        if( ship.hits( asteroid )) {
            console.log('ooops!');
        }
        asteroid.render();
        asteroid.update();
        asteroid.edges();
    }
    v.asteroids = asteroids.length;

    // 레이저들

    for( var i=lasers.length-1; i>=0; --i ) {

        var laser = lasers[i];
        laser.render();
        laser.update();

        // 화면을 벋어나면 피괴한다.

        if( laser.offscreen() ) {

            lasers.splice(i,1);

        } else {

            // 운석들과 총돌 체크

            for( var j=asteroids.length-1; j>=0; --j ) {

                if( laser.hits( asteroids[j] ) ) {

                    var asteroid = asteroids[j];

                    if( asteroid.radius > 10 ) {

                        // 운석이 조각들로 분리된다.

                        var newAsteroids = asteroid.breakup();
                        asteroids = asteroids.concat(newAsteroids);

                    } else {
                        // 스코어 획득
                    }

                    // 운석을 파괴한다.

                    asteroids.splice(j,1);

                    // 레이저를 파괴시킨다.

                    lasers.splice(i,1);

                    break;
                }
            }
        }
    }
    v.lasers = lasers.length;

    // 우주선

    ship.render();
    ship.turn();
    ship.update();
    ship.edges();

}


// -----------------------------------------------------------------
// 프로젝트 전용 함수들
// -----------------------------------------------------------------

