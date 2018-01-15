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

    title       = 'Photo Mosaic with Social Media Images : 소셜미디어 이미지 모자이크 처리';
    subTitle    = '기본 프레임워크 설정 : 픽셀박스 안에 다른 이미지를 넣는것은 생략...(나중에 필요하면 ObamaMosaic.pde파일 참고)';

    referUrls.push({
        text:'',
        link:''
    });


    defaultCanvasWidth  = 600;
    defaultCanvasHeight = 749;
}

// -----------------------------------------------------------------
// 프로젝트 전용 변수들
// -----------------------------------------------------------------
var original;
var smaller;
var scaleF = 16;
var w;
var h;
var bright;
var brightImage;

// -----------------------------------------------------------------
// 사전 작업 ( preload )
// -----------------------------------------------------------------

function awake () {

    original = loadImage('../../../../images/obama.jpg');

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


    w = floor(original.width/scaleF);
    h = floor(original.height/scaleF);
    smaller = createImage(w,h);
    smaller.copy(original,0,0,original.width,original.height,0,0,w,h);



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

    //image(original,0,0);
    //image(smaller,0,0);

    smaller.loadPixels();
    for( var x=0; x<w; ++x ) {
        for( var y=0; y<h; ++y ) {
            var index = (x+y*w)*4;
            var r = smaller.pixels[index+0];
            var g = smaller.pixels[index+1];
            var b = smaller.pixels[index+2];
            var c = color(r,g,b);
            var bright = brightness(c);
            fill(c);
            //fill(bright); // 흑백
            noStroke();
            rect(x*scaleF,y*scaleF,scaleF,scaleF);
        }
    }

    smaller.updatePixels();

    noLoop();
}


// -----------------------------------------------------------------
// 프로젝트 전용 함수들
// -----------------------------------------------------------------

