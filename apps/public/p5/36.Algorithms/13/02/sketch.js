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

// 나무가지 룰
variables : F+-[]
axiom  : F
rules  : F → FF+[+F-F-F]-[-F+F+F]

*/
// -----------------------------------------------------------------
// 전역 변수들
// -----------------------------------------------------------------
var thisCanvas;
var widthSlider;
var heightSlider;

var angle;
var axiom = 'F'; // 공리 : 과학 이론의 출발점이 되는 공리는 그 이론에 의해 증명될 필요가 없는 것으로서 그 이론의 다른 제 명제가 일정한 규칙에 따라서 유도되는 기본적인 명제이다.
var sentence = axiom; // 문장
var len = 100;

var rules = [];
rules[0] = {
    a: 'F',
    b: 'FF+[+F-F-F]-[-F+F+F]'
}


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Fractal Trees - L-System : 프랙탈 트리 - L-System ');
    createA('https://en.wikipedia.org/wiki/L-system','L-System(Lindenmayer-System) 구현');
    createDiv('나무가지룰 구현');

    createSpan('width:');
    widthSlider = createSlider( 100, 1000, 400, 10 ).changed( ()=>{
        reset();
    });
    createSpan('height:');
    heightSlider = createSlider( 100, 1000, 400, 10 ).changed( ()=>{
        reset();
    });


    createDiv('');
}

function setup () {

    reset();
}

function draw () {

}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------


function reset () {

    // 캔버스 설정

    var width = widthSlider.value();
    var height = heightSlider.value();

    if( !thisCanvas ) {
        thisCanvas = createCanvas(width,height);
    } else {
        resizeCanvas(width,height);
    }

    pixelDensity(1);

    // 초기화

    angle = radians(25);
    background(51);

    createP(axiom);
    turtle();
    var button = createButton('Generate');
    button.mousePressed( generate );

}

function generate () {

    len *= 0.5;

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
    turtle();
}

function turtle () {

    background(51);
    resetMatrix();
    translate( width/2, height );
    stroke(255, 100);

    for( var i=0; i<sentence.length; ++i ) {
        var current = sentence.charAt(i);

        if( current == 'F' ) {
            line( 0, 0, 0, -len );
            translate( 0, -len );
        }
        else
        if( current == '+' ) {
            rotate(angle);
        }
        else
        if( current == '-' ) {
            rotate(-angle);
        }
        else
        if( current == '[' ) {
            push();
        }
        else
        if( current == ']' ) {
            pop();
        }

    }

}