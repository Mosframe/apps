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
var drops = [];


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Space Invaders  : 스페이스 인베이더 게임');
    createP('');
    createP('플레이어 이동키를 누르는 동안 이동 처리');
    createP('발사:space bar, 이동:좌우방향키');
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

    // ship

    ship.show();
    ship.move();

    // drops

    for( var i=0; i<drops.length; ++i ) {

        drops[i].show();
        drops[i].move();

        for( var j=0; j<flowers.length; ++j ) {

            if( drops[i].hits( flowers[j] ) ) {

                flowers[j].grow();
                drops[i].evaporate();
                console.log('HIT!');
            }
        }
    }

    // flowers

    var edge = false;
    for( var i=0; i<flowers.length; ++i ) {

        flowers[i].show();
        flowers[i].move();

        if( flowers[i].x < 0 || flowers[i].x > width ) {
            edge = true;
        }
    }

    if( edge ) {
        for( var i=0; i<flowers.length; ++i ) {
            flowers[i].shiftDown();
        }
    }

    // drops delete

    for( var i=drops.length-1; i>=0; --i ) {
        if( drops[i].toDelete ) {
            drops.splice(i, 1);
        }
    }
}

function keyPressed () {

    if( key === ' ' ) {

        var drop = new Drop(ship.x, height);
        drops.push(drop);
    }

    if( keyCode === LEFT_ARROW ) {
        ship.setDir(-1);
    }
    else
    if( keyCode === RIGHT_ARROW ) {
        ship.setDir(1);
    }
}

function keyReleased () {

    if( key != ' ' ) {

        if( ship.xdir === -1 && keyCode === LEFT_ARROW ) {
            ship.setDir(0);
        }
        else
        if( ship.xdir === 1 && keyCode === RIGHT_ARROW ) {
            ship.setDir(0);
        }
    }
}


// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------