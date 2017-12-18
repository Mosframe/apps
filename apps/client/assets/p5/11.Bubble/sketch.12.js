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

    for( let i=0; i<5; ++i ) {

        let x = random(width);
        let y = random(height);
        let r = random(10, 50);

        let b = new Bubble(x, y, r);
        bubbles.push(b);
    }
}

// 디스플레이

function draw () {

    background(0);

    for( let bubble of bubbles ) {

        if( bubble.contains( mouseX, mouseY ) ) {
            bubble.changeColor(255);
        } else {
            bubble.changeColor(0);
        }
        bubble.move();
        bubble.show();
    }
}

// 마우스 클릭

function mousePressed () {

    for( let i=0; i<bubbles.length; ++i ) {

        if( bubbles[i].contains( mouseX, mouseY ) ) {
            bubbles.splice(i, 1);
        }
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

