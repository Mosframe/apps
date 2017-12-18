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
var paragraph;


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

// 설정

function setup () {

    cavas = createCanvas(100, 100);
    background(0);

    paragraph = select('#unicorn');
    //paragraph.mouseOver(hightlight);
    //paragraph.mouseOut(unhightlight);

    for( var i=0; i<100; ++i ) {
        var par = createP('rainbow!');
        par.position(random(500), random(500));
    }

    paragraphs = selectAll('p');
    for( var i=0; i<paragraphs.length; ++i ) {
        paragraphs[i].mouseOver(hightlight);
        paragraphs[i].mouseOut(unhightlight);
    }

    createP("[테스트 방법]");
    createP("마우스를 문자들 위에 올려보세요.");
}

// 디스플레이

function draw () {
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

function hightlight () {

    this.style('padding','16pt');
    this.style('background-color', '#F0F');
}


function unhightlight () {

    this.style('padding','0pt');
    this.style('background-color', '#FFF');
}
