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
var canvas;
var mic;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

// 설정

function setup () {

    canvas = createCanvas(windowWidth,windowHeight);
    canvas.position(0,0);
    canvas.style('z-index', '-1');

    mic = new p5.AudioIn();
    mic.start();

}

function draw () {

    background(175);
    var vol = mic.getLevel();
    ellipse(width/2, height/2, vol * width * 10);
}

function windowResized() {

    //console.log("resized");
    resizeCanvas(windowWidth,windowHeight);
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------


