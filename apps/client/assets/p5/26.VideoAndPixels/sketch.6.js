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

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function setup () {

    createCanvas(640, 480);
    pixelDensity(1);
    video = createCapture(VIDEO);
    video.size(width/vScale,height/vScale);
}

function draw () {

    background(51);

    video.loadPixels();
    loadPixels();

    for( var y=0; y<video.height; ++y ) {
        for( var x=0; x<video.width; ++x ) {

            //var index =(x + y*video.width)*4;

            // 미러 처리

            var index =(video.width - x + 1 + (y*video.width))*4;

            var r = video.pixels[index+0];
            var g = video.pixels[index+1];
            var b = video.pixels[index+2];

            // 흑백 픽셀

            var bright = (r+g+b)/3;

            // 피셀 사이즈

            var w = map(bright, 0, 255, 0, vScale);
            noStroke();
            fill(255);
            rectMode(CENTER);

            // 픽셀라이즈

            rect(x*vScale,y*vScale,w,w);
        }
    }
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

