/**
 * sketch.js
 *
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 변수, 오브젝트 정의
// -----------------------------------------------------------------
var flock;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

// 설정

function setup () {

    //createP("파티클 생성: 마우스 좌클릭");

    createCanvas(640, 360);

    resetSketch();

    createP("");
    var button = createButton("reset");
    button.mousePressed(resetSketch);
}


// 디스플레이

function draw () {

    background(51);
    flock.run();
}


// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------


function resetSketch () {

    flock = new Flock();
    for( var i=0; i<100; ++i ) {
        var b = new Boid(width/2, height/2);
        flock.addBoid(b);
    }
}
