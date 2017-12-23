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


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function setup () {

    createCanvas(320, 240);
    pixelDensity(1);
    video = createCapture(VIDEO);
    video.size(320,240);
}

function draw () {

    background(51);

    video.loadPixels();
    loadPixels();

    for( var y=0; y<height; ++y ) {
        for( var x=0; x<width; ++x ) {

            var index =(x + y*width)*4;

            var r = video.pixels[index+0];
            var g = video.pixels[index+1];
            var b = video.pixels[index+2];

            // 흑백 이미지 랜더링
            var bright = (r+g+b)/3;

            pixels[index+0] = bright;
            pixels[index+1] = bright;
            pixels[index+2] = bright;
            pixels[index+3] = 255;
        }
    }

    updatePixels();
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

