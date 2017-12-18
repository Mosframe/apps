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
//let unicorn;


// -----------------------------------------------------------------
// p5함수들
// -----------------------------------------------------------------

// 설정

function setup () {

    createCanvas(600, 400);

    for( let i=0; i<200; i++ ) {
        let x = random(width);
        let y = random(height);
        let r = random(5, 8);
        bubbles[i] = new Bubble(x, y, r);
    }

    //unicorn = new Bubble(400,200,10);
}

// 디스플레이

function draw () {

    background(0);

    //if( bubble1.intersects( bubble2 ) ) {
    //    background(200, 0, 100);
    //}

    //unicorn.x = mouseX;
    //unicorn.y = mouseY;
    //unicorn.show();
    //unicorn.move();

    for( let b of bubbles ) {

        b.show();
        b.move();

        let overlapping = false;

        for( let other of bubbles ) {

            if( b != other && b.intersects(other) ) {
                overlapping = true;
            }
        }

        if( overlapping ) {
            b.changeColor(255);
        } else {
            b.changeColor(0);
        }
    }
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
        return ( d < this.r );
    }

    intersects ( other ) {

        let d = dist( this.x, this.y, other.x, other.y );
        return ( d < this.r + other.r );
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

