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

var x = 0;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function setup () {

    createCanvas(800,240);
    pixelDensity(1);
    video = createCapture(VIDEO);
    video.size(320,240);
    background(51);
}


function draw () {

    //background(51);

    video.loadPixels();

    // 수직 1라인 픽셀 복사

    var w = video.width;
    var h = video.height;
    copy(video, w/2, 0, 1, h, x, 0, 1, h );

    ++x;
    if( x > width ) {
        x = 0;
    }
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

