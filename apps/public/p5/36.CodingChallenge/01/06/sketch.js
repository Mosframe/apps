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
var stars = [];
var speedSlider;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function setup () {

    speedSlider = createSlider(0,50,10);
    createP('');

    createCanvas(800,450);

    for( var i=0; i<400; ++i ) {
        stars[i] = new Star();
    }
}

function draw () {

    background(0);

    translate(width/2,height/2);

    for( var i=0; i<stars.length; ++i ) {

        stars[i].update();
        stars[i].show();
    }

}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------
