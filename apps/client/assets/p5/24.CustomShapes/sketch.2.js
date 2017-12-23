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
let t = 0;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function setup () {

    createCanvas(400, 400);
    angleMode(DEGREES);

}

function draw () {

    background(0);

    stroke(255);
    noFill();

    strokeWeight(4);
    point(mouseX,mouseY);
    point(150,50);
    point(250,60);
    point(300,200);


    strokeWeight(1);

    beginShape();

    curveVertex(mouseX,mouseY); // 컨트롤 포인트
    curveVertex(100,200);
    curveVertex(150,50);
    curveVertex(250,60);
    curveVertex(300,200);
    curveVertex(300,200);

    endShape();

}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

