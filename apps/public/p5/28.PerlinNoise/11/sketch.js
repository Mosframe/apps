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

    createCanvas(400, 400);
    pixelDensity(1);
}


function draw () {

    background(51);

    loadPixels();

    //noiseDetail(1,0.1); // 디테일값은 1차원 파형에서 조절하자.

    var yOffset = 0;
    for( var y=0; y<height; ++y ) {

        var xOffset = 0;
        for( var x=0; x<width; ++x ) {

            var index = (x + y * width) * 4;
            var c = noise(xOffset,yOffset) * 255;
            pixels[index+0] = c;
            pixels[index+1] = c;
            pixels[index+2] = c;
            pixels[index+3] = 255;

            xOffset += inc;
        }
        yOffset += inc;
    }

    updatePixels();
    //noLoop();
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

