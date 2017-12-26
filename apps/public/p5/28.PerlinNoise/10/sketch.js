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
var inc = 0.01;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function setup () {

    createCanvas(200, 200);
    pixelDensity(1);
}


function draw () {

    background(51);

    loadPixels();

    var xOffset = 0;

    /*
    // 수직 노이즈
    for( var x=0; x<width; ++x ) {
        for( var y=0; y<height; ++y ) {
            var index = (x + y * width) * 4;
            var c = noise(xOffset) * 255;
            pixels[index+0] = c;
            pixels[index+1] = c;
            pixels[index+2] = c;
            pixels[index+3] = 255;

            xOffset += 0.01;
        }
    }
    */

    // 수평 노이즈
    for( var y=0; y<height; ++y ) {
        for( var x=0; x<width; ++x ) {
            var index = (x + y * width) * 4;
            var c = noise(xOffset) * 255;
            pixels[index+0] = c;
            pixels[index+1] = c;
            pixels[index+2] = c;
            pixels[index+3] = 255;

            xOffset += inc;
        }
    }

    updatePixels();
    noLoop();
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

