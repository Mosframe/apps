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

var xOffsetSlider;
var yOffsetSlider;
var zoomInput;
var maxIterationsSlider;
var caSlider;
var cbSlider;
var aniCheckbox;
var basicCheckbox;

var zoom            = 5;
var xOffset         = 0;
var yOffset         = 0;
var maxIterations   = 100;
var angle           = 0;
var ca              = 0;
var cb              = 0;

var basic       = true;
var ani         = true;
var useColor    = false;



// ...


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Julia Set : 줄리아 집합');
    createA('https://en.wikipedia.org/wiki/Julia_set','Julia set wiki');
    createDiv('');
    createA('http://paulbourke.net/fractals/juliaset/','Julia Set Fractal (2D)');
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

    createSpan('xOffset:');
    xOffsetSlider = createSlider( -1000, 1000, 0, 1 ).touchMoved( ()=>{
        xOffset = xOffsetSlider.value();
    });
    createSpan('yOffset:');
    yOffsetSlider = createSlider( -1000, 1000, 0, 1 ).touchMoved( ()=>{
        yOffset = yOffsetSlider.value();
    });
    createSpan('zoom:');
    zoomInput = createInput(zoom).input( ()=>{
        zoom = Number(zoomInput.value());
    });
    createSpan('maxIterations:');
    maxIterationsSlider = createSlider( 2, 2000, 100, 1 ).touchMoved( ()=>{
        maxIterations = maxIterationsSlider.value();
    });
    createSpan('ca:');
    caSlider = createSlider( -1, 1, -0.70176, 0.001 ).touchMoved( ()=>{
        ca = caSlider.value();
    });
    createSpan('cb:');
    cbSlider = createSlider( -1, 1, -0.3842, 0.001 ).touchMoved( ()=>{
        cb = cbSlider.value();
    });
    basicCheckbox = createCheckbox( 'basic', false ).changed( ()=>{
        basic = basicCheckbox.checked();
    });
    aniCheckbox = createCheckbox( 'ani', false ).changed( ()=>{
        ani = aniCheckbox.checked();
    });
    useColorCheckbox = createCheckbox( 'useColor', false ).changed( ()=>{
        useColor = useColorCheckbox.checked();
        if( useColor ) {
            colorMode(HSB,255);
        } else {
            colorMode(RGB,255);
        }
    });
    createButton('-0.70176, -0.3842').mousePressed( ()=>{

        ca = -0.70176;
        cb = -0.3842;
        ani = false;

        caSlider.value(ca);
        cbSlider.value(cb);
        aniCheckbox.checked(ani);
    });
    createButton('0, 0.8').mousePressed( ()=>{

        ca = 0;
        cb = 0.8;
        ani = false;

        caSlider.value(ca);
        cbSlider.value(cb);
        aniCheckbox.checked(ani);
    });
    createButton('0.8, 0').mousePressed( ()=>{

        ca = 0.8;
        cb = 0;
        ani = false;

        caSlider.value(ca);
        cbSlider.value(cb);
        aniCheckbox.checked(ani);
    });
    createButton('-0.8, 0').mousePressed( ()=>{

        ca = -0.8;
        cb = 0;
        ani = false;

        caSlider.value(ca);
        cbSlider.value(cb);
        aniCheckbox.checked(ani);
    });
    createButton('-0.8, 0.156').mousePressed( ()=>{

        ca = -0.8;
        cb = 0.156;
        ani = false;

        caSlider.value(ca);
        cbSlider.value(cb);
        aniCheckbox.checked(ani);
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

    background(255);

    // 에니메이션
    if( ani ) {
        ca = cos(angle*3.213);
        cb = sin(angle);
        caSlider.value(ca);
        cbSlider.value(cb);
        angle += 0.02;
    }

    // 가우스 평면에 다양한 범위를 설정하여 프랙탈에서 확대/축소를 한다.

    var w       = zoom;
    var h       = (w * height) / width;
    var xmin    = -w/2;
    var ymin    = -h/2;
    var xmax    = xmin + w;
    var ymax    = xmin + h;
    var dx      = (xmax-xmin)/width;
    var dy      = (ymax-ymin)/height;

    loadPixels();

    var i = xmin + (xOffset*dx);
    for( var x=0; x<width; ++x, i += dx ) {
        var j = ymin + (yOffset*dy);
        for( var y=0; y<height; ++y, j += dy ) {

            var a = i;
            var b = j;

            // Mandelbrot Set 기본
            if( basic ) {
                ca = a;
                cb = b;
            }

            var n = 0;
            while( n < maxIterations ) {

                var aa = a * a;
                var bb = b * b;

                // 무한루프방지 : a+b가 16보다 크면 중지

                if( aa + bb > 4.0 ) {
                    break;
                }

                var twoab = 2.0 * a * b;
                a = aa - bb + ca;
                b = twoab + cb;

                ++n;
            }

            //var bright = 200;
            //var bright = map( n, 0, maxIterations, 0, 255 );
            var bright = map( n, 0, maxIterations, 0, 1 );
            bright = map( sqrt(bright), 0, 1, 0, 255 );

            if( n == maxIterations ) {
                bright = 0;
            }

            if( useColor ) {

                var pixelColor = color(bright,255,255,255);

                var pix = (x+y*width) * 4;
                pixels[pix+0] = pixelColor.levels[0];
                pixels[pix+1] = pixelColor.levels[1];
                pixels[pix+2] = pixelColor.levels[2];
                pixels[pix+3] = pixelColor.levels[3];
            } else {
                var pix = (x+y*width) * 4;
                pixels[pix+0] = bright;
                pixels[pix+1] = bright;
                pixels[pix+2] = bright;
                pixels[pix+3] = 255;
            }
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

    xOffset         = xOffsetSlider.value();
    yOffset         = yOffsetSlider.value();
    zoom            = Number(zoomInput.value());
    maxIterations   = maxIterationsSlider.value();
    ca              = caSlider.value();
    cb              = cbSlider.value();
    basic           = basicCheckbox.checked();
    ani             = aniCheckbox.checked();
    useColor        = useColorCheckbox.checked();

    if( useColor ) {
        colorMode(HSB,255);
    } else {
        colorMode(RGB,255);
    }


    // ...

    changing = false;
}
