/**
 * sketch.js
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */

/*
L-System : https://en.wikipedia.org/wiki/L-system

variables : A B
axiom  : A
rules  : (A → AB), (B → A)

*/
// -----------------------------------------------------------------
// 전역 변수들
// -----------------------------------------------------------------
var axiom = 'A'; // 공리 : 과학 이론의 출발점이 되는 공리는 그 이론에 의해 증명될 필요가 없는 것으로서 그 이론의 다른 제 명제가 일정한 규칙에 따라서 유도되는 기본적인 명제이다.
var sentence = axiom; // 문장

var rules = [];
rules[0] = {
    a: 'A',
    b: 'ABC'
}
rules[1] = {
    a: 'B',
    b: 'A'
}


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Fractal Trees - L-System : 프랙탈 트리 - L-System ');
    createA('https://en.wikipedia.org/wiki/L-system','L-System(Lindenmayer-System) 구현');
    createDiv('기본 프레임워크 구현');
    createDiv('');

}

function setup () {

    noCanvas();
    createP(axiom);
    var button = createButton('Generate');
    button.mousePressed( generate );

}

function draw () {

    background(255);
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

function generate () {

    var nextSentence = '';
    for( var i=0; i<sentence.length; ++i ) {
        var current = sentence.charAt(i);
        var found = false;
        for( var j=0; j<rules.length; ++j ) {
            if( current == rules[j].a ) {
                nextSentence += rules[j].b;
                found = true;
                break;
            }
        }
        if( !found ) {
            nextSentence += current;
        }
    }
    sentence = nextSentence;
    createP(sentence);
}