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
var nameInput;
var nameP;

// -----------------------------------------------------------------
// p5함수들
// -----------------------------------------------------------------

// 설정

function setup () {

    cavas = createCanvas(200, 200);
    cavas.mouseOver(overpara);
    cavas.mouseOut(outpara);
    cavas.mousePressed(changeColor);

    bgcolor = color(200);

    createP('');
    button = createButton("change bg color");
    button.mousePressed(changeColor);

    createP('');
    slider = createSlider(10, 100, 86);

    nameP = createP('Your name!');
    nameP.mouseOver(overpara);
    nameP.mouseOut(outpara);

    nameInput = createInput('type your name');
    nameInput.input(updateText);

    createP("[테스트 방법]");
    createP("마우스를 Your name!에 올려보세요.");
    createP("마우스를 캔버스에 올려보세요.");
    createP("캔버스를 클릭해보세요.");
    createP("입력상자에 무언가를 입력하세요.");
}

function mousePressed () {

    //changeColor();
}

// 디스플레이

function draw () {
    background(bgcolor);
    fill(255,0,175);
    ellipse(100,100, slider.value(), slider.value() );

    //nameP.html(nameInput.value());
    text(nameInput.value(), 10, 20);
}

// -----------------------------------------------------------------
//
// -----------------------------------------------------------------

function changeColor () {
    bgcolor = color(random(255));
}

function overpara () {
    nameP.html('your mouse is over me!');
}

function outpara () {
    nameP.html('your mouse is out');
}

function updateText () {
    nameP.html(nameInput.value());
}
