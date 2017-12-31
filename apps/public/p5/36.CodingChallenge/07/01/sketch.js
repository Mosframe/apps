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
var planets = [];

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Solar System : 태양계 구현');
    createP('기본 프레임워크 생성');
    createP('');
}

function setup () {

    createCanvas(800,450);

    sun = new Planet( 50, 0 );
    sun.spawnMoons( 5 );

    console.log(planets);
}

function draw () {

    background(0);

    translate( width/2, height/2 );
    sun.show();

    for( var i=0; i<planets.length; ++i ) {
        planets[i].show();
    }

}




// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------
