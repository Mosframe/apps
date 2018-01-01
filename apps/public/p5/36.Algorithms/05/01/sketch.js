/**
 * sketch.js
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 변수, 오브젝트 정의
// -----------------------------------------------------------------
var ship;
var flowers = [];


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Space Invaders  : 스페이스 인베이더 게임');
    createP('');
    createP('기본 프레임워크 생성');
}

function setup () {

    createCanvas(600,400);

    ship = new Ship();

    for( var i=0; i<6; ++i ) {

        flowers[i] = new Flower(i*80+80,60);
    }

}

function draw () {

    background(51);

    ship.show();

    for( var i=0; i<flowers.length; ++i ) {

        flowers[i].show();
    }
}

function keyPressed () {

    if( keyCode === LEFT_ARROW ) {
        ship.move(-1);
    }
    else
    if( keyCode === RIGHT_ARROW ) {
        ship.move(1);
    }
}


// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------
