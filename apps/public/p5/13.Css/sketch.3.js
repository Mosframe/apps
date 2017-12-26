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
var textbox;
var slider;
var paragraph;


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

// 설정

function setup () {

    noCanvas();

    paragraph = createP('starting text');
    textbox = createInput('enter text');
    createP('');
    slider = createSlider(10,64,16);

    //textbox.changed( doSomething );
    textbox.input( doSomething );
    slider.input( updateSize );

    createP("[테스트 방법]");
    createP("enter text에 문자을 입력하세요.");
    createP("슬라이더를 조절해 보세요.");
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------


function doSomething () {

    paragraph.html(textbox.value());
}

function updateSize () {

    paragraph.style("font-size", slider.value() + 'pt' );
}
