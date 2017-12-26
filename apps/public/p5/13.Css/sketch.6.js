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
var paragraphs;


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

// 설정

function setup () {

    cavas = createCanvas(100, 100);
    background(0);

    //paragraphs = selectAll('p');
    paragraphs = selectAll('.rainbow');
    for( var i=0; i<paragraphs.length; ++i ) {
        paragraphs[i].style('font-size','24pt');
    }

    var button = select('#button');
    button.mousePressed(canvasBg);

    createP("[테스트 방법]");
    createP("같은클래스만 스타일을 변화시켰다.");
}

// 디스플레이

function draw () {
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

function canvasBg () {
    background( random(255) );
}