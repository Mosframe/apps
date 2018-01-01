/**
 * sketch.js
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */

/*


*/
// -----------------------------------------------------------------
// 전역 변수들
// -----------------------------------------------------------------
var thisCanvas;
var widthSlider;
var heightSlider;
var rootCenterCheckbox;
var changing = true;

var tree;
var maxDist = 50;
var minDist = 5;
var rootCenter;


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Fractal Trees - Space Colonization  : 프랙탈 트리 - 우주식민지 건설 알고리즘');
    createA('http://algorithmicbotany.org/papers/colonization.egwnp2007.large.pdf','Modeling Trees with a Space Colonization Algorithm');
    createDiv('');
    createA('http://www.sea-of-memes.com/LetsCode26/LetsCode26.html','Trees - Space Colonization Algorithm');
    createDiv('TopView 구현');

    createSpan('width:');
    widthSlider = createSlider( 100, 1000, 400, 10 ).changed( ()=>{
        reset();
    });
    createSpan('height:');
    heightSlider = createSlider( 100, 1000, 400, 10 ).changed( ()=>{
        reset();
    });
    rootCenterCheckbox = createCheckbox( 'rootCenter' ).changed( ()=>{
        reset();
    });

    createDiv('');
}

function setup () {

    reset();
}

function draw () {

    if( changing ) return;

    background(51);

    tree.draw();
    tree.grow();
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------


function reset () {

    changing = true;

    // 캔버스 설정

    var width = widthSlider.value();
    var height = heightSlider.value();

    if( !thisCanvas ) {
        thisCanvas = createCanvas(width,height);
    } else {
        resizeCanvas(width,height);
    }

    //frameRate(5);
    pixelDensity(1);

    // 초기화

    rootCenter = rootCenterCheckbox.checked();

    tree = new Tree();

    changing = false;
}
