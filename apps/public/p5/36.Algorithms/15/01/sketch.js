/**
 * sketch.js
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */

/*


*/
// -----------------------------------------------------------------
// 전역 변수들
// -----------------------------------------------------------------
var thisCanvas;
var widthSlider;
var heightSlider;
var aSlider;
var bSlider;
var nSlider;
var changing = true;

var a = 100;
var b = 100;
var n = 2;



// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Superellipse  : 슈퍼일립스(초타원)');
    createA('https://en.wikipedia.org/wiki/Superellipse','Superellipse Wiki');
    createDiv('');
    createA('http://paulbourke.net/geometry/superellipse/','Superellipse and Superellipsoid');
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
    createSpan('a:');
    aSlider = createSlider( 0, 400, 100, 1 ).touchMoved( ()=>{
        a = aSlider.value();
    });
    createSpan('b:');
    bSlider = createSlider( 0, 400, 100, 1 ).touchMoved( ()=>{
        b = bSlider.value();
    });
    createSpan('n:');
    nSlider = createSlider( 0, 10, 3, 0.01 ).touchMoved( ()=>{
        n = nSlider.value();
    });

    createDiv('');
}

function setup () {

    reset();
}

function draw () {

    if( changing ) return;

    background(51);


    //var r = 100;

    stroke(255);
    noFill();

    translate( width/2, height/2 );

    beginShape();
    for( var angle=0; angle<TWO_PI; angle += 0.1 ) {

        // circle

        //var x = r * cos(r);
        //var y = r * sin(r);

        // superellipse

        var na = 2/n;
        var x = pow( abs(cos(angle)), na ) * a * sgn(cos(angle));
        var y = pow( abs(sin(angle)), na ) * b * sgn(sin(angle));

        vertex(x,y);
    }
    endShape(CLOSE);

}


// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------


function reset () {

    changing = true;

    // 캔버스 설정

    var width = widthSlider.value();
    var height = heightSlider.value();

    if( !thisCanvas ) {
        thisCanvas = createCanvas(width,height);
    } else {
        resizeCanvas(width,height);
    }

    //frameRate(5);
    pixelDensity(1);

    // 초기화

    a = aSlider.value();
    b = bSlider.value();
    n = nSlider.value();



    changing = false;
}

// 값의 사인값 얻기

function sgn ( val ) {

    if( val > 0 ) {
        return 1;
    }
    else
    if( val < 0 ) {
        return -1;
    }
    return 0;
}