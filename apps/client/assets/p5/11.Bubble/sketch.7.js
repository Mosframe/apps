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

let bubbles = [];

// -----------------------------------------------------------------
// p5함수들
// -----------------------------------------------------------------

// 설정

function setup () {

    createCanvas(600, 400);

    for( let i=0; i<1000; ++i ) {
        let x = random(width);
        let y = random(height);
        let r = random(10, 40);
        bubbles[i] = new Bubble(x, y, r);
    }
}

// 디스플레이

function draw () {

    background(0);

    for( let i=0; i<bubbles.length; ++i ) {

        bubbles[i].move();
        bubbles[i].show();
    }
}

// -----------------------------------------------------------------
// Bubble
// -----------------------------------------------------------------

class Bubble {

    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    move () {
        this.x = this.x + random(-5,5);
        this.y = this.y + random(-5,5);
    }

    show () {
        noStroke();
        fill(255, 10);
        ellipse(this.x, this.y, this.r*2);
    }
}

