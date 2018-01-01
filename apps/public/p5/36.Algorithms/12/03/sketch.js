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
var branchScaleSlider;

var angle;
var branchScale;

var tree = [];


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Fractal Trees  : 프랙탈 트리');
    createDiv('개체지향으로 구현');

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
    createSpan('branchScale:');
    branchScaleSlider = createSlider( 0.4, 0.75, 0.67, 0,01 ).touchMoved( ()=>{
        branchScale = branchScaleSlider.value();
    });
    createDiv('');
    createButton('Create Branch').touchEnded( ()=>{
        createBranch();
    });


    createDiv('');
}

function setup () {

    reset();
}

function draw () {

    background(51);

    for( var i=0; i<tree.length; ++i ) {
        tree[i].draw();
    }
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
    branchScale   = branchScaleSlider.value();


    var a = createVector( width/2, height );
    var b = createVector( width/2, height-100 );

    var root = new Branch( a, b );

    tree[0] = root;

}

function createBranch() {

    for( var i=tree.length-1; i>=0; --i ) {
        tree.push(tree[i].branchA() );
        tree.push(tree[i].branchB() );
    }
}