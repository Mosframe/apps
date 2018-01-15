/**
 * main.js
 *
 * p5.js    : http://p5js.org/reference
 * web      : http://developer.mozilla.org
 * @author  : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 환경설정 변수들 설정
// -----------------------------------------------------------------

function description () {

    title       = 'Pixel Sorting  : 픽셀 정렬';
    subTitle    = '기본 프레임워크 설정';

    referUrls.push({
        text:'',
        link:''
    });


    defaultCanvasWidth  = 800;
    defaultCanvasHeight = 400;
}

// -----------------------------------------------------------------
// 프로젝트 전용 변수들
// -----------------------------------------------------------------
var img;
var sorted;
var index = 0;

// -----------------------------------------------------------------
// 사전 작업 ( preload )
// -----------------------------------------------------------------

function awake () {

    img = loadImage("../../../../images/flower.png");
}

// -----------------------------------------------------------------
// 프레임 갱신 시작 ( setup )
// -----------------------------------------------------------------

function start () {

    // pixelDensity(1);
    // frameRate(5);
    // background(0);
    // colorMode(HSB);
    // angleMode(DEGREES);
    // removeCanvas();

    // 복제

    sorted = img.get();

 }

// -----------------------------------------------------------------
// 입력
// -----------------------------------------------------------------

function keyPressed () {

}

function  keyReleased () {

}

// -----------------------------------------------------------------
// 프레임 갱신
// -----------------------------------------------------------------

function update () {


}

// -----------------------------------------------------------------
// 프레임 렌더링
// -----------------------------------------------------------------

function render () {

    // noLoop();
    // colorMode(HSB);
    background( 0 );

    // 픽셀들을 밝기|생상 순으로 정렬
    // 주의 : 이미지가 크면 오래걸린다.

    sorted.loadPixels();

    for( var n=0; n<10; ++n ) {

        var record = -1;
        var selectedPixel = index;

        for( var j=index; j<sorted.pixels.length; ++j ) {

            var jj = j*4;

            var r = sorted.pixels[jj+0];
            var g = sorted.pixels[jj+1];
            var b = sorted.pixels[jj+2];
            var a = sorted.pixels[jj+3];

            var c = color( r, g, b, a );

            var bright = hue(c);
            //var bright = brightness(c);

            if( bright > record ) {
                selectedPixel = j;
                record = bright;
            }
        }

        // swap

        var ii = index*4;
        var si = selectedPixel*4;

        var p0 = sorted.pixels[ii+0];
        var p1 = sorted.pixels[ii+1];
        var p2 = sorted.pixels[ii+2];
        var p3 = sorted.pixels[ii+3];

        sorted.pixels[ii+0] = sorted.pixels[si+0];
        sorted.pixels[ii+1] = sorted.pixels[si+1];
        sorted.pixels[ii+2] = sorted.pixels[si+2];
        sorted.pixels[ii+3] = sorted.pixels[si+3];

        sorted.pixels[si+0] = p0;
        sorted.pixels[si+1] = p1;
        sorted.pixels[si+2] = p2;
        sorted.pixels[si+3] = p3;

        if( index < (sorted.width*sorted.height)-1 ) {
            ++index;
        }
    }

    sorted.updatePixels();

    image( img, 0, 0 );
    image( sorted, 400, 0 );
}


// -----------------------------------------------------------------
// 프로젝트 전용 함수들
// -----------------------------------------------------------------

