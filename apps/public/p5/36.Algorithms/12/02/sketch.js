/**
 * sketch.js
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 전역 변수들
// -----------------------------------------------------------------
var thisCanvas;
var widthSlider;
var heightSlider;
var angleSlider;
var childRateSlider;

var angle;
var childRate;


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Fractal Trees  : 프랙탈 트리');
    createDiv('재귀함수로 하위 양방향 가지들 구현');

    createSpan('width:');
    widthSlider = createSlider( 100, 1000, 400, 10 ).changed( ()=>{
        reset();
    });
    createSpan('height:');
    heightSlider = createSlider( 100, 1000, 400, 10 ).changed( ()=>{
        reset();
    });
    createSpan('angle:');
    angleSlider = createSlider( 0, PI, PI/4 , 0.01 ).touchMoved( ()=>{
        angle = angleSlider.value();
    });
    createSpan('childRate:');
    childRateSlider = createSlider( 0.4, 0.75, 0.67, 0,01 ).touchMoved( ()=>{
        childRate = childRateSlider.value();
    });

    createDiv('');
}

function setup () {

    reset();
}

function draw () {

    background(51);

    var len = 100;

    stroke(255);

    // 시작위치 설정 : 중앙-하단
    translate( 200, height );

    branch( 100 );


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

    angle       = angleSlider.value();
    childRate   = childRateSlider.value();

}

// 가지 드로잉 ( 재귀함수 )

function branch ( len ) {

    // 가지 드로잉
    line( 0, 0,  0, -len );
    // 기준점 이동
    translate( 0, -len );

    // 하위 가지
    if( len > 4 ) {
        // 오른쪽 가지
        push();
        rotate( angle );
        branch( len * childRate );
        pop();
        // 왼쪽 가지
        push();
        rotate( -angle );
        branch( len * childRate );
        pop();
    }
}