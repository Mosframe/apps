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
}

function draw () {

    background(51);

    loadPixels();

    for( var y=0; y<height; ++y ) {
        for( var x=0; x<width; ++x ) {

            var index =(x + y*width)*4;

            pixels[index+0] = x;
            pixels[index+1] = random(255);
            pixels[index+2] = y;
            pixels[index+3] = 255;
        }
    }

    updatePixels();
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

