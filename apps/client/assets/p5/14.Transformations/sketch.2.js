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
let angle = 0;



// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

// 설정

function setup () {

    createCanvas(400, 400);

    angleMode(DEGREES);


    //createP("[테스트 방법]");
    //createP("버튼을 클릭하세요.");
}

// 디스플레이

function draw () {

    background(0);

    translate(50,50);
    rotate(angle);

    fill(255);
    rectMode(CENTER);
    rect(0,0,100,50);

    angle += 5;
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------
