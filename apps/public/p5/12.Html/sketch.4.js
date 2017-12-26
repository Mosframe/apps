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
var bgcolor;
var button;
var slider;
var input;
var nameP;

// -----------------------------------------------------------------
// p5함수들
// -----------------------------------------------------------------

// 설정

function setup () {


    cavas = createCanvas(200, 200);
    bgcolor = color(200);

    createP('');
    button = createButton("change bg color");
    button.mousePressed(changeColor);

    createP('');
    slider = createSlider(10, 100, 86);

    nameP = createP('Your name!');
    input = createInput('type your name');

    createP("[테스트 방법]");
    createP("입력창에 무언가를 입력해 보세요.");
}

function mousePressed () {

    //changeColor();
}

// 디스플레이

function draw () {
    background(bgcolor);
    fill(255,0,175);
    ellipse(100,100, slider.value(), slider.value() );

    nameP.html(input.value());
    text(input.value(), 10, 20);
}

// -----------------------------------------------------------------
//
// -----------------------------------------------------------------

function changeColor () {
    bgcolor = color(random(255));
}
