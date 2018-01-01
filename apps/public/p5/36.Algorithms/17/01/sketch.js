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

var mapScale        = 2.5;
var maxIterations   = 100;

// ...


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Mandelbrot Set : 맨들브로트 집합');
    createA('https://en.wikipedia.org/wiki/Mandelbrot_set','Mandelbrot set wiki');
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
    // ...

    createDiv('');
}

function setup () {

    reset();
}

function draw () {

    if( changing ) return;

    // ...

    loadPixels();
    for( var x=0; x<width; ++x ) {
        for( var y=0; y<height; ++y ) {

            var a = map( x, 0, width , -mapScale, mapScale );
            var b = map( y, 0, height, -mapScale, mapScale );

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

            var bright = 200;

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
    // ...

    changing = false;
}
