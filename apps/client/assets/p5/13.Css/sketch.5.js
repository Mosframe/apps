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
var paragraph;


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

// 설정

function setup () {

    cavas = createCanvas(100, 100);
    background(0);

    // select는 여러개의 element가 있을때는 첫번째 element만 얻어온다.
    //paragraph = select('#unicorn');
    paragraph = select('.rainbow');
    //paragraph = select('p');
    paragraph.mouseOver(changeBackground);

    var button = select('#button');
    button.mousePressed(canvasBg);

    createP("[테스트 방법]");
    createP("마우스를 문자위에 올려보세요.");
    createP("버튼을 클릭해 보세요.");
}

// 디스플레이

function draw () {
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

function changeBackground () {
    paragraph.style('background-color', '#F0F');
}

function canvasBg () {
    background( random(255) );
}