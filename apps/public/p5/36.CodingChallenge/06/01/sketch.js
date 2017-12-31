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
var cells = [];

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Mitosis Simulation : 유사분열 시뮬레이션');
    createA('https://en.wikipedia.org/wiki/Mitosis','Mitosis');
    createP('');
    createP('기본 프레임워크 생성');
    createP('');
}

function setup () {

    createCanvas(600,400);


    cells.push( new Cell() );
}

function draw () {

    background(51);

    for( var i=0; i<cells.length; ++i ) {
        cells[i].move();
        cells[i].show();
    }
}




// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------
