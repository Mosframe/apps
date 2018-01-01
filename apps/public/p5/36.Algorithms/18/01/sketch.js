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
var changing = true;

// ...

var xScaleSlider;
var yScaleSlider;
var maxIterationsSlider;

var xScale          = 2.5;
var yScale          = 2.5;
var maxIterations   = 1000;

// ...


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Julia Set : 줄리아 집합');
    createA('https://en.wikipedia.org/wiki/Julia_set','Julia set wiki');
    createDiv('');
    createDiv('기본 프레임워크 구현');

    createSpan('width:');
    widthSlider = createSlider( 100, 1000, 400, 10 ).changed( ()=>{
        reset();
    });
    createSpan('height:');
    heightSlider = createSlider( 100, 1000, 400, 10 ).changed( ()=>{
        reset();
    });
    createDiv('');

    // ...

    createSpan('xScale:');
    xScaleSlider = createSlider( 0.0, 10.0, 2.5, 0.01 ).touchMoved( ()=>{
        xScale = xScaleSlider.value();
    });
    createSpan('yScale:');
    yScaleSlider = createSlider( 0.0, 10.0, 2.5, 0.01 ).touchMoved( ()=>{
        yScale = yScaleSlider.value();
    });
    createSpan('maxIterations:');
    maxIterationsSlider = createSlider( 2, 2000, 1000, 1 ).touchMoved( ()=>{
        maxIterations = maxIterationsSlider.value();
    });

    // ...

    createDiv('');
}

function setup () {

    reset();
}

function draw () {

    if( changing ) return;

    // ...

    //background(255,0,0);

    loadPixels();
    for( var x=0; x<width; ++x ) {
        for( var y=0; y<height; ++y ) {

            var a = map( x, 0, width , -xScale, xScale );
            var b = map( y, 0, height, -yScale, yScale );

            var ca = a;
            var cb = b;

            var n = 0;

            while( n < maxIterations ) {
                var aa = a * a - b * b;
                var bb = 2 * a * b;

                a = aa + ca;
                b = bb + cb;

                if( abs(a + b) > 16 ) {
                    break;
                }

                ++n;
            }

            //var bright = 200;
            //var bright = map( n, 0, maxIterations, 0, 255 );
            var bright = map( n, 0, maxIterations, 0, 1 );
            bright = map( sqrt(bright), 0, 1, 0, 255 );

            if( n == maxIterations ) {
                bright = 0;
            }

            var pix = (x+y*width) * 4;
            pixels[pix+0] = bright;
            pixels[pix+1] = bright;
            pixels[pix+2] = bright;
            pixels[pix+3] = 255;
        }
    }
    updatePixels();

    // ...
}


// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------


function reset () {

    changing = true;

    // 캔버스 설정

    var width   = widthSlider.value();
    var height  = heightSlider.value();

    if( !thisCanvas ) {
        thisCanvas = createCanvas(width,height);
    } else {
        resizeCanvas(width,height);
    }

    //frameRate(5);
    pixelDensity(1);

    // ...

    xScale        = xScale = xScaleSlider.value();
    yScale        = yScale = yScaleSlider.value();
    maxIterations   = maxIterationsSlider.value();

    // ...

    changing = false;
}
