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
var x = 0;
var timer1;
var timer2;
var counter = 0;
var interval;
var button;


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

// 설정

function setup () {

    createCanvas(200, 200);

    timer1 = createP('timer');
    timer2 = createP('timer');

    makeTimer(timer1, 500);
    makeTimer(timer2, 312);

}

// 디스플레이

function draw () {

    // timer1.html(frameCount);

    background(51);

    stroke(255);
    line(x,0,x,height);

    x += 3;
    if( x > width ) {
        x = 0;
    }
}

function mousePressed () {

    stopTimer();
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

function makeTimer (elt, wait) {

    var counter = 0;
    setInterval(timeIt, wait);

    function timeIt () {

        elt.html(counter);
        ++counter;
    }
}