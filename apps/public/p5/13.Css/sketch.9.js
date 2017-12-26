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
var happy = ['rainbow', 'unicorn', 'purple', 'bacteria'];



// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

// 설정

function setup () {

    noCanvas();

    var button = select('#button');
    button.mousePressed(addItem);

    createP("[테스트 방법]");
    createP("버튼을 클릭한다.");
}

// 디스플레이

function draw () {
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------


function addItem () {

    var r = floor(random(0,happy.length));
    var li = createElement('li', happy[r]);
    li.parent('happylist');
}