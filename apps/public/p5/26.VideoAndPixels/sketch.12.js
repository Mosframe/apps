/**
 * sketch.js
 *
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 변수, 오브젝트 정의
// -----------------------------------------------------------------
var video;
var blurSlider;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function setup () {

    // 캔버스 설정

    var canvas = createCanvas(640,480, WEBGL);
    canvas.id('p5canvas');
    pixelDensity(1);
    background(51);

    // 비디오 설정

    video = createCapture(VIDEO);
    video.size(640,480);
    video.id('p5video');
    //video.hide();

    // 블러 농도 조절 슬라이더 설정

    createP('');
    blurSlider = createSlider(0,1,0.5, 0.01);
    blurSlider.id('blur-slider');

    // Seriously 설정

    var seriously = new Seriously();
    var src     = seriously.source('#p5video');
    var target  = seriously.target('#p5canvas');

    // 블러 이펙트 설정

    //var blur = seriously.effect('blur');
    //blur.amount = '#blur-slider';
    //blur.source = src;
    //target.source = blur;

    // 크로마 이펙트 설정

    var chroma = seriously.effect('chroma');
    chroma.source = '#p5video';
    target.source = chroma;

    // 녹색을 제거한다.

    var r =  98 / 255;
    var g = 175 / 255;
    var b = 116 / 255;
    chroma.screen = [r,g,b,1];

    // Seriously 실행

    seriously.go();
}


function draw () {

    //background(51);

    //video.loadPixels();


}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

