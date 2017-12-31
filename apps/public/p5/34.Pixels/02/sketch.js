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
var step = 0;
var originalImg;
var img;
var slider1;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    originalImg = loadImage('../../../images/hstar.jpg');
}

function setup () {

    createButton(0).mousePressed(()=>{step=0;slider1.hide();});
    createButton(1).mousePressed(()=>{step=1;slider1.show();});
    //createButton(2).mousePressed(()=>{step=2;slider1.hide();});
    //createButton(3).mousePressed(()=>{step=3;slider1.hide();});
    //createButton(4).mousePressed(()=>{step=4;slider1.hide();});
    //createButton(5).mousePressed(()=>{step=5;slider1.hide();});
    //createButton(6).mousePressed(()=>{step=6;slider1.hide();});
    //createButton(7).mousePressed(()=>{step=7;slider1.hide();});
    createP('');

    slider1 = createSlider(0,10,3,0.1); slider1.hide();
    createP('');

    createCanvas(originalImg.width,originalImg.height);

    background(0);
}

function mousePressed () {

    //++step;
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

    loadPixels();
    originalImg.loadPixels();

    for( var x=0; x<width-1; ++x ) {
        for( var y=0; y<height; ++y ) {

            var loc1 = ( x    + y*width)*4;
            var loc2 = ((x+1) + y*width)*4;

            var r1 = originalImg.pixels[loc1+0];
            var g1 = originalImg.pixels[loc1+1];
            var b1 = originalImg.pixels[loc1+2];

            var r2 = originalImg.pixels[loc2+0];
            var g2 = originalImg.pixels[loc2+1];
            var b2 = originalImg.pixels[loc2+2];

            var c1 = color(r1,g1,b1);
            var c2 = color(r2,g2,b2);

            var t1 = brightness( c1 );
            var t2 = brightness( c2 );

            var diff = abs(t1-t2);

            var c = color(diff*255,diff*255,diff*255);

            pixels[loc1+0] = c.levels[0];
            pixels[loc1+1] = c.levels[1];
            pixels[loc1+2] = c.levels[2];
        }
    }
    updatePixels();
}

// 이미지의 경계선을 드로잉

function draw1 () {

    loadPixels();
    originalImg.loadPixels();

    for( var x=0; x<width-1; ++x ) {
        for( var y=0; y<height; ++y ) {

            var loc1 = ( x    + y*width)*4;
            var loc2 = ((x+1) + y*width)*4;

            var r1 = originalImg.pixels[loc1+0];
            var g1 = originalImg.pixels[loc1+1];
            var b1 = originalImg.pixels[loc1+2];

            var r2 = originalImg.pixels[loc2+0];
            var g2 = originalImg.pixels[loc2+1];
            var b2 = originalImg.pixels[loc2+2];

            var c1 = color(r1,g1,b1);
            var c2 = color(r2,g2,b2);

            var t1 = brightness( c1 );
            var t2 = brightness( c2 );

            var diff = abs(t1-t2);

            if( diff > slider1.value() ) {
                pixels[loc1+0] = 0;
                pixels[loc1+1] = 0;
                pixels[loc1+2] = 0;
            } else {
                pixels[loc1+0] = 255;
                pixels[loc1+1] = 255;
                pixels[loc1+2] = 255;
            }

        }
    }
    updatePixels();

}


function draw2 () {

}


function draw3 () {


}

function draw4 () {


}

function draw5 () {


}


function draw6 () {


}


function draw7 () {


}
