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
var video;
var vScale = 16;

var particles = [];

var alphaSlider;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function setup () {

    createCanvas(640,480);
    pixelDensity(1);
    video = createCapture(VIDEO);
    video.size(width/vScale,height/vScale);

    for(var i=0; i<200; ++i) {
        particles[i] = new Particle(random(width),random(height));
    }

    alphaSlider = createSlider(0, 255, 127);
    background(51);
}


function draw () {

    //background(51);
    video.loadPixels();
    for(var i=0; i<100; ++i) {
        particles[i].update();
        particles[i].show();
    }

}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

