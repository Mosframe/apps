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
}

// 디스플레이

function draw () {

    background(0);

    for( let i=0; i<bubbles.length; ++i ) {

        bubbles[i].move();
        bubbles[i].show();
    }
}

// 마우스 클릭

function mousePressed() {

    let r = random(10, 50);
    let b = new Bubble(mouseX, mouseY, r);

    bubbles.push(b);
}

// 마우스 드래그

function mouseDragged() {

        let r = random(10, 50);
        let b = new Bubble(mouseX, mouseY, r);

        bubbles.push(b);
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
        stroke(255);
        strokeWeight(4);
        noFill();
        ellipse(this.x, this.y, this.r*2);
    }
}

