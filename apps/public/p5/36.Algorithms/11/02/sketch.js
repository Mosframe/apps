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

var dA      = 1;
var dB      = 0.5;
var feed    = 0.055;
var k       = 0.062;

var changing = true;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Reaction Diffusion : 반응확산 알고리즘');
    createA('http://www.karlsims.com/rd.html','Reaction-Diffusion Tutorial');
    createDiv('기본 프레임워크 구현');
    createSpan('width:');
    widthSlider = createSlider(100,1000,200,10).changed( ()=>{
        createGrid();
    });
    createSpan('height:');
    heightSlider = createSlider(100,1000,200,10).changed( ()=>{
        createGrid();
    });

    createDiv('');
}

function setup () {

    createGrid();
}

function draw () {

    if( changing ) return;

    background(51);

    for( var x=1; x<width-1; ++x ) {
        for( var y=1; y<height-1; ++y ) {
            var a = grid[x][y].a;
            var b = grid[x][y].b;
            next[x][y].a = a
                         + (dA * laplaceA(x,y))
                         - (a * b * b)
                         + (feed * ( 1 - a ));
            next[x][y].b = b
                         + (dB * laplaceB(x,y))
                         + (a * b * b)
                         - ((k + feed) * b);

            next[x][y].a = constrain( next[x][y].a, 0, 1 );
            next[x][y].b = constrain( next[x][y].b, 0, 1 );
        }
    }

    loadPixels();
    for( var x=0; x<width; ++x ) {
        for( var y=0; y<height; ++y ) {
            var a = next[x][y].a;
            var b = next[x][y].b;
            var c = floor((a-b)*255);
            c = constrain(c,0,255);
            var pix = (x + y * width) * 4;
            pixels[pix + 0] = c;
            pixels[pix + 1] = c;
            pixels[pix + 2] = c;
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

    changing = true;

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
            grid[x][y] = { a:1, b:0 };
            next[x][y] = { a:1, b:0 };
        }
    }

    var dw = width/2;
    var dh = height/2;

    var iw = floor(width * 0.1);
    var ih = floor(height * 0.1);

    for( var i=dw; i<dw+iw; ++i ) {
        for( var j=dh; j<dh+ih; ++j ) {
            grid[i][j].b = 1;
        }
    }

    changing = false;
}

function swap () {

    var temp = grid;
    grid = next;
    next = temp;
}

function laplaceA (x,y) {
    var sumA = 0;
    sumA += grid[x+0][y+0].a * -1;
    sumA += grid[x-1][y+0].a * 0.2;
    sumA += grid[x+1][y+0].a * 0.2;
    sumA += grid[x+0][y+1].a * 0.2;
    sumA += grid[x+0][y-1].a * 0.2;
    sumA += grid[x-1][y-1].a * 0.05;
    sumA += grid[x+1][y-1].a * 0.05;
    sumA += grid[x+1][y+1].a * 0.05;
    sumA += grid[x-1][y+1].a * 0.05;
    return sumA;
}

function laplaceB (x,y) {
    var sumB = 0;
    sumB += grid[x+0][y+0].b * -1;
    sumB += grid[x-1][y+0].b * 0.2;
    sumB += grid[x+1][y+0].b * 0.2;
    sumB += grid[x+0][y+1].b * 0.2;
    sumB += grid[x+0][y-1].b * 0.2;
    sumB += grid[x-1][y-1].b * 0.05;
    sumB += grid[x+1][y-1].b * 0.05;
    sumB += grid[x+1][y+1].b * 0.05;
    sumB += grid[x-1][y+1].b * 0.05;
    return sumB;
}