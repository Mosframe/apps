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

    createCanvas(600, 400);

    bubble1 = new Bubble(200, 200);
    bubble2 = new Bubble(300, 200, 100);
}

// 디스플레이

function draw () {

    background(0);

    let d = dist( bubble1.x, bubble1.y, bubble2.x, bubble2.y );
    if( d < bubble1.r + bubble2.r ) {
        background(200, 0, 100);
    }


    bubble1.show();
    bubble2.show();

    bubble1.move();
    bubble2.move();
}

// -----------------------------------------------------------------
// Bubble
// -----------------------------------------------------------------

class Bubble {

    constructor(x, y, r=50) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.brightness = 0;
    }

    changeColor (bright) {

        this.brightness = bright;
    }

    contains (px, py) {

        let d = dist( px, py, this.x, this.y );
        if( d < this.r ) {
            return true;
        } else {
            return false;
        }
    }

    move () {
        this.x = this.x + random(-5,5);
        this.y = this.y + random(-5,5);
    }

    show () {
        stroke(255);
        strokeWeight(4);
        fill(this.brightness, 125);
        ellipse(this.x, this.y, this.r*2);
    }
}
