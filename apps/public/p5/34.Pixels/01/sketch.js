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
var step = 7;
var originalImg;
var img;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    originalImg = loadImage('../../../images/hstar.jpg');
}

function setup () {

    createButton(0).mousePressed(()=>{step=0});
    createButton(1).mousePressed(()=>{step=1});
    createButton(2).mousePressed(()=>{step=2});
    createButton(3).mousePressed(()=>{step=3});
    createButton(4).mousePressed(()=>{step=4});
    createButton(5).mousePressed(()=>{step=5});
    createButton(6).mousePressed(()=>{step=6});
    createButton(7).mousePressed(()=>{step=7});
    createP('');

    createCanvas(originalImg.width,originalImg.height);

    background(0);
}

function draw () {

    switch(step%8) {
    case 0: draw0(); break;
    case 1: draw1(); break;
    case 2: draw2(); break;
    case 3: draw3(); break;
    case 4: draw4(); break;
    case 5: draw5(); break;
    case 6: draw6(); break;
    case 7: draw7(); break;
    }
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

function draw0 () {

   image(originalImg, 0, 0, width, height);
}

function draw1 () {

    loadPixels();
    originalImg.loadPixels();

    for( var x=0; x<width; ++x ) {
        for( var y=0; y<height; ++y ) {

            var loc = (x+y*width)*4;
            var r = originalImg.pixels[loc+0];
            var g = originalImg.pixels[loc+1];
            var b = originalImg.pixels[loc+2];

            if( x > width/2 ) {
                pixels[loc+0] = b;
                pixels[loc+1] = r;
                pixels[loc+2] = g*2;
            } else {
                pixels[loc+0] = r;
                pixels[loc+1] = g;
                pixels[loc+2] = b;
            }
        }
    }
    updatePixels();
}


function draw2 () {

    loadPixels();
    originalImg.loadPixels();

    for( var x=0; x<width; ++x ) {
        for( var y=0; y<height; ++y ) {

            var loc = (x+y*width)*4;
            var r = originalImg.pixels[loc+0];
            var g = originalImg.pixels[loc+1];
            var b = originalImg.pixels[loc+2];

            var d = dist(width/2, height/2, x, y);
            pixels[loc+0] = r+d;
            pixels[loc+1] = g+d;
            pixels[loc+2] = b+d;
       }
    }
    updatePixels();
}


function draw3 () {

    loadPixels();
    originalImg.loadPixels();

    for( var x=0; x<width; ++x ) {
        for( var y=0; y<height; ++y ) {

            var loc = (x+y*width)*4;
            var r = originalImg.pixels[loc+0];
            var g = originalImg.pixels[loc+1];
            var b = originalImg.pixels[loc+2];

            var d = dist(width/2, height/2, x, y);
            pixels[loc+0] = r+mouseX;
            pixels[loc+1] = g+mouseX;
            pixels[loc+2] = b+mouseX;
        }
    }
    updatePixels();
}

function draw4 () {

    loadPixels();
    originalImg.loadPixels();

    for( var x=0; x<width; ++x ) {
        for( var y=0; y<height; ++y ) {

            var loc = (x+y*width)*4;
            var r = originalImg.pixels[loc+0];
            var g = originalImg.pixels[loc+1];
            var b = originalImg.pixels[loc+2];

            var d = dist(width/2, height/2, x, y);

            var factor = map(d,0,width/2,0,2);
            pixels[loc+0] = r*factor;
            pixels[loc+1] = g*factor;
            pixels[loc+2] = b*factor;
        }
    }
    updatePixels();
}

function draw5 () {

    loadPixels();
    originalImg.loadPixels();

    for( var x=0; x<width; ++x ) {
        for( var y=0; y<height; ++y ) {

            var loc = (x+y*width)*4;
            var r = originalImg.pixels[loc+0];
            var g = originalImg.pixels[loc+1];
            var b = originalImg.pixels[loc+2];

            var d = dist(width/2, height/2, x, y);

            var factor = map(d,0,width/2,2,0);
            pixels[loc+0] = r*factor;
            pixels[loc+1] = g*factor;
            pixels[loc+2] = b*factor;
        }
    }
    updatePixels();
}


function draw6 () {

    loadPixels();
    originalImg.loadPixels();

    for( var x=0; x<width; ++x ) {
        for( var y=0; y<height; ++y ) {

            var loc = (x+y*width)*4;
            var r = originalImg.pixels[loc+0];
            var g = originalImg.pixels[loc+1];
            var b = originalImg.pixels[loc+2];

            var d = dist(mouseX, mouseY, x, y);

            var factor = map(d,0,width/4,2,0);
            pixels[loc+0] = r*factor;
            pixels[loc+1] = g*factor;
            pixels[loc+2] = b*factor;
        }
    }
    updatePixels();
}


function draw7 () {

    loadPixels();
    originalImg.loadPixels();

    for( var x=0; x<width; ++x ) {
        for( var y=0; y<height; ++y ) {

            var loc = (x+y*width)*4;
            var r = originalImg.pixels[loc+0];
            var g = originalImg.pixels[loc+1];
            var b = originalImg.pixels[loc+2];

            var c = color(r,g,b);

            var bright = brightness(c);

            if( bright > mouseX ) {
                pixels[loc+0] = 255;
                pixels[loc+1] = 255;
                pixels[loc+2] = 255;
            } else {
                pixels[loc+0] = 0;
                pixels[loc+1] = 0;
                pixels[loc+2] = 0;
            }
        }
    }
    updatePixels();
}
