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
    beginShape();

    let spacing = map(mouseX,0,width,5,100);

    for( let a=0; a<360; a +=spacing ) {
        let x = 100*sin(a)+200;
        let y = 100*cos(a)+200;
        vertex(x,y);
    }
    endShape(CLOSE);

}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

