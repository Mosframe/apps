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
let flower;
let kittens = [];


// -----------------------------------------------------------------
// p5함수들
// -----------------------------------------------------------------

// 프리로드

function preload() {
    flower = loadImage('./Images/flower.png');
}

// 설정

function setup () {

    createCanvas(600, 400);

    for( let i=0; i<10; ++i ) {

        let x = random(width);
        let y = random(height);
        let r = random(20, 60);
        let b = new Bubble(x, y, r);
        bubbles.push(b);
    }
}

// 디스플레이

function draw () {

    background(0);

    for( let bubble of bubbles ) {

        bubble.move();
        bubble.show();
    }
}

// 마우스 클릭

function mousePressed () {

    for( let i =0; i<bubbles.length; ++i) {
        bubbles[i].clicked(mouseX, mouseY);
    }
}

// -----------------------------------------------------------------
// Bubble
// -----------------------------------------------------------------

class Bubble {

    constructor(x, y, r, img) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.kitten = img;
    }

    clicked (px, py) {

    }

    move () {
        this.x = this.x + random(-5,5);
        this.y = this.y + random(-5,5);
    }

    show () {

        image( flower, this.x, this.y, this.r, this.r );

        //stroke(255);
        //strokeWeight(4);
        //fill(this.brightness, 125);
        //ellipse(this.x, this.y, this.r*2);
    }
}

