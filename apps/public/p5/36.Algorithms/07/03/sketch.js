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
var sun;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Solar System : 태양계 구현');
    createP('행성들의 달 구현');
    createP('');
}

function setup () {

    createCanvas(800,450);

    sun = new Planet( 50, 0, 0 );
    sun.spawnMoons( 5, 0 );
}

function draw () {

    background(0);

    translate( width/2, height/2 );
    sun.show();
    sun.orbit();
}




// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------
