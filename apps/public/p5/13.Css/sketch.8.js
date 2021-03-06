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



// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

// 설정

function setup () {

    canvas = createCanvas(400, 400);
    //canvas.parent('#canvasp');
    canvas.parent('canvasp');

    createP("[테스트 방법]");
    createP("캔버스를 특정 element에 배치시킨 것을 확인");
}

// 디스플레이

function draw () {

    background(0);
    ellipse(200,200, random(100), random(100));
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

