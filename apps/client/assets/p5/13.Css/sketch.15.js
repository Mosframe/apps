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
var sliders = [];
var angle = 0;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

// 설정

function setup () {

    noCanvas();

    createP("첫번째 슬라이더를 컨트롤한다.");

    //createCanvas(200,200);
    createP("");

    for( var i=0; i<100; ++i ) {
        sliders[i] = createSlider(0,255,50);
    }

    sliders[0].input(adjustSliders);
}

/*
function draw () {

    var offset = 0;
    for( var i=0; i<sliders.length; ++i ) {
        // y = map(x,minX,maxX,minY,maxY)
        var x = map(sin(angle+offset), -1, 1, 0, 255);
        sliders[i].value(x);
        offset += 0.025;
    }

    angle += 0.1;
}
*/

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------


function adjustSliders () {

    for( var i=1; i<sliders.length; ++i ) {
        sliders[i].value(sliders[0].value());
    }
}

