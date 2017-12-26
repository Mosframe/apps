/**
 * sketch.js
 *
 * 거품 그리기
 *
 * 레퍼런스: http://p5js.org/reference
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 변수, 오브젝트 정의
// -----------------------------------------------------------------
let bubble1;
let bubble2;

// -----------------------------------------------------------------
// p5함수들
// -----------------------------------------------------------------

// 설정

function setup () {

    createCanvas(600,400);

    bubble1 = new Bubble();
    bubble2 = new Bubble();
}

// 디스플레이

function draw () {

    background(0);

    bubble1.move();
    bubble2.move();
    bubble1.show();
    bubble2.show();
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

// Bubble

class Bubble {

    constructor() {
        this.x = 200;
        this.y = 150;
    }

    move () {
        this.x = this.x + random(-5,5);
        this.y = this.y + random(-5,5);
    }

    show () {
        stroke(255);
        strokeWeight(4);
        noFill();
        ellipse(this.x,this.y,24,24);
    }
}


