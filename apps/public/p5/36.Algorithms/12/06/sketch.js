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
var angleASlider;
var angleBSlider;
var branchScaleSlider;
var leafLevelSlider;
var fallingLeavesCheckbox;

var angleA;
var angleB;
var branchScale;
var leafLevel;
var fallingLeaves;

var tree        = [];
var leaves      = [];
var nodeCount   = 0;


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Fractal Trees  : 프랙탈 트리');
    createDiv('나무잎 떨어트림');

    createSpan('width:');
    widthSlider = createSlider( 100, 1000, 400, 10 ).changed( ()=>{
        reset();
    });
    createSpan('height:');
    heightSlider = createSlider( 100, 1000, 400, 10 ).changed( ()=>{
        reset();
    });
    createSpan('angleA:');
    angleASlider = createSlider( 0, PI, PI/6 , 0.01 ).touchMoved( ()=>{
        angleA = angleASlider.value();
    });
    createSpan('angleB:');
    angleBSlider = createSlider( 0, PI, PI/4 , 0.01 ).touchMoved( ()=>{
        angleB = angleBSlider.value();
    });
    createSpan('branchScale:');
    branchScaleSlider = createSlider( 0.4, 0.75, 0.67, 0,01 ).touchMoved( ()=>{
        branchScale = branchScaleSlider.value();
    });
    createSpan('leafLevel:');
    leafLevelSlider = createSlider( 1, 10, 5, 1 ).touchMoved( ()=>{
        leafLevel = leafLevelSlider.value();
    });
    fallingLeavesCheckbox = createCheckbox('fallingLeaves').changed( ()=>{
        fallingLeaves = fallingLeavesCheckbox.checked();
    });
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
        //tree[i].jitter();
    }

    fill(255,0,100,100);
    noStroke();
    for( var i=0; i<leaves.length; ++i ) {
        ellipse( leaves[i].x, leaves[i].y, 16, 16 );
        if( fallingLeaves ) {
            leaves[i].y += random(0,2);
        }
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

    angleA          = angleASlider.value();
    angleB          = angleBSlider.value();
    branchScale     = branchScaleSlider.value();
    leafLevel       = leafLevelSlider.value();
    fallingLeaves   = fallingLeavesCheckbox.checked();


    var a = createVector( width/2, height );
    var b = createVector( width/2, height-100 );

    var root = new Branch( a, b );

    tree[0] = root;

}

function createBranch() {

    for( var i=tree.length-1; i>=0; --i ) {
        if( !tree[i].finished ) {
            tree.push(tree[i].branchA() );
            tree.push(tree[i].branchB() );
        }
        tree[i].finished = true;
    }
    ++nodeCount;

    if( nodeCount === leafLevel ) {
        for( var i=0; i<tree.length; ++i ) {
            if( !tree[i].finished ) {
                var leaf = tree[i].end.copy();
                leaves.push(leaf);
            }
        }
    }
}