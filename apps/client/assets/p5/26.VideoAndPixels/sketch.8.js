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
var slider;

var cols = 40;
var rows = 30;

var boxes = [];

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function setup () {

    noCanvas();
    pixelDensity(1);
    video = createCapture(VIDEO);
    video.size(cols,rows);

    slider = createSlider(0,255, 77);
    for( var y=0; y<rows; ++y ) {
        for( var x=0; x<cols; ++x ) {

            var box = createCheckbox();
            box.style('display', 'inline');
            box.parent('mirror');
            boxes.push(box);
        }
        var linebreak = createSpan('<br/>');
        linebreak.parent('mirror');
    }
}


function draw () {

    video.loadPixels();

    for( var y=0; y<video.height; ++y ) {
        for( var x=0; x<video.width; ++x ) {

            //var index =(x + y*video.width)*4;

            // 미러 처리

            var index =(video.width - x + 1 + (y*video.width))*4;

            var r = video.pixels[index+0];
            var g = video.pixels[index+1];
            var b = video.pixels[index+2];

            // 흑백 픽셀 + 체크박스 체크

            var bright = (r+g+b)/3;

            var threshold = slider.value();

            var checkIndex = x+y*cols;

            if( bright > threshold ) {
                boxes[checkIndex].checked(false);
            } else {
                boxes[checkIndex].checked(true);
            }
        }
    }
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

