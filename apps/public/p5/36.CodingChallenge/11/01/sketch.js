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
var thisCanvas;
var widthSlider;
var heightSlider;

var grid;
var next;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Reaction Diffusion : 반응확산 알고리즘');
    createA('http://www.karlsims.com/rd.html','Reaction-Diffusion Tutorial');
    createDiv('기본 프레임워크 구현');
    createSpan('width:');
    widthSlider = createSlider(100,1000,400,10).changed( ()=>{
        createGrid();
    });
    createSpan('height:');
    heightSlider = createSlider(100,1000,400,10).changed( ()=>{
        createGrid();
    });

    createDiv('');
}

function setup () {

    createGrid();
}

function draw () {

    background(51);

    for( var x=0; x<width; ++x ) {
        for( var y=0; y<height; ++y ) {
            next[x][y].a = grid[x][y].a * 0.95;
            next[x][y].b = grid[x][y].b * 1.01;
        }
    }

    loadPixels();
    for( var x=0; x<width; ++x ) {
        for( var y=0; y<height; ++y ) {
            var c = color(255, 0, 100);
            var pix = (x + y *width) * 4;
            pixels[pix + 0] = floor(next[x][y].a * 255);
            pixels[pix + 1] = 0;
            pixels[pix + 2] = floor(next[x][y].b * 255);
            pixels[pix + 3] = 255;
        }
    }
    updatePixels();

    swap();
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------


function createGrid () {

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

    grid = [];
    next = [];
    for( var x=0; x<width; ++x ) {
        grid[x] = [];
        next[x] = [];
        for( var y=0; y<height; ++y ) {
            grid[x][y] = { a:random(1), b:random(1) };
            next[x][y] = { a:0, b:0 };
        }
    }
}


function swap () {

    var temp = grid;
    grid = next;
    next = temp;
}