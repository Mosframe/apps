/**
 * sketch.js
 *
 * 레퍼런스: http://p5js.org/reference
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 변수, 오브젝트 정의
// -----------------------------------------------------------------
var canvas;
var h1;

var x = 100;
var y = 100;

// -----------------------------------------------------------------
// p5함수들
// -----------------------------------------------------------------

// 설정

function setup () {

    cavas = createCanvas(200, 200);
    cavas.position(400,500);
    h1 = createElement('h1', `마우스를 클릭하세요.`);
    //h1.position(400,600);
}

function mousePressed () {
    h1.html("Now I will show you my favorite number.");
    createP(`My favorite number is ${random(0,10)}.`);
}

// 디스플레이

function draw () {
    //clear();
    background(200);
    fill(255,0,175);
    rect(x,y,50,50);
    h1.position(x,y);
    x = x + random(-5,5);
}

// -----------------------------------------------------------------
//
// -----------------------------------------------------------------
