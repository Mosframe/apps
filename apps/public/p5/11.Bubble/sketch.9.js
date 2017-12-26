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

//let bubbles = [];
let bubble;

// -----------------------------------------------------------------
// p5함수들
// -----------------------------------------------------------------

// 설정

function setup () {

    createCanvas(600, 400);

    let x = random(width);
    let y = random(height);
    let r = random(10, 50);

    bubble = new Bubble(x, y, r);
    //bubbles.push(b);

}

// 디스플레이

function draw () {

    background(0);

    bubble.move();
    bubble.show();

    /*
    for( let bubble of bubbles ) {

        bubble.move();
        bubble.show();
    }
    */
}

// 마우스 클릭

function mousePressed() {

    bubble.clicked();

    //let r = random(10, 50);
    //let b = new Bubble(mouseX, mouseY, r);
//
    //bubbles.push(b);
}

/*
// 마우스 드래그

function mouseDragged() {

        let r = random(10, 50);
        let b = new Bubble(mouseX, mouseY, r);

        bubbles.push(b);
}
*/

// -----------------------------------------------------------------
// Bubble
// -----------------------------------------------------------------

class Bubble {

    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    clicked () {

        let d = dist( mouseX, mouseY, this.x, this.y );
        if( d < this.r ) {
            console.log("clicked");
        }
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

