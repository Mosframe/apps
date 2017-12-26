/**
 * sketch.js
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 변수, 오브젝트 정의
// -----------------------------------------------------------------
var canvas;
var bgcolor;
var button;
var txt;


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

// 설정

function setup () {

    cavas = createCanvas(200, 200);
    bgcolor = color(51);
    txt = createP('some text');
    txt.mouseOver(changeStyle);
    txt.mouseOut(revertStyle);

    button = createButton("change style");
    //button.mousePressed(changeStyle);


    createP("[테스트 방법]");
    createP("some text에 마우스를 오버시켜보세요.");
}

// 디스플레이

function draw () {

    background(bgcolor);
    fill(255,0,175);
    ellipse(100,100,50,50);
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------


function changeStyle () {
    txt.style("background-color", "pink");
    txt.style("padding", "24px");
}
function revertStyle () {
    txt.style("background-color", "purple");
    txt.style("padding", "8px");
}