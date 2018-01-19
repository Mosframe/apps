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

    title       = 'Fractal Spirograph : 프랙탈 스피로그래프, 도형틀 제작';
    subTitle    = '기본 프레임워크 설정';

    referUrls.push({
        text:'Fun math art (pictures) - benice equation',
        link:'http://benice-equation.blogspot.kr/2012/01/fractal-spirograph.html'
    });

    defaultCanvasWidth  = 600;
    defaultCanvasHeight = 600;
}

// -----------------------------------------------------------------
// 프로젝트 전용 변수들
// -----------------------------------------------------------------
var path = [];
var sun;
var end;

var k = -2;
var c = 3;
var resolution = 10;

var kSlider;
var cSlider;
var resolutionSlider;

// -----------------------------------------------------------------
// 사전 작업 ( preload )
// -----------------------------------------------------------------

function awake () {


    kSlider = createSlider(-20,20,-2,1).changed(()=>{
        reset();
    }).parent( canvasContainer );
    cSlider = createSlider(1,20,3,1).changed(()=>{
        reset();
    }).parent( canvasContainer );
    resolutionSlider = createSlider(1,100,10,1).changed(()=>{
        reset();
    }).parent( canvasContainer );

    createDiv('').parent( canvasContainer );

    createButton('-2').mousePressed(()=>{
        kSlider.value(-2);
        reset();
    }).parent( canvasContainer );
    createButton('-3').mousePressed(()=>{
        kSlider.value(-3);
        reset();
    }).parent( canvasContainer );
    createButton('-4').mousePressed(()=>{
        kSlider.value(-4);
        reset();
    }).parent( canvasContainer );
}

// -----------------------------------------------------------------
// 프레임 갱신 시작 ( setup )
// -----------------------------------------------------------------

function start () {

    // pixelDensity(1);
    // frameRate(5);
    // background(51);
    // colorMode(HSB);
    // angleMode(DEGREES);
    // removeCanvas();

    k = kSlider.value();
    c = cSlider.value();
    resolution = resolutionSlider.value();

    v.k = k;
    v.c = c;
    v.resolution = resolution;

    path = [];

    sun = new Orbit(width/2,height/2,width/4,0);

    var next = sun;
    for( var i=0; i<c; ++i ) {
        next = next.addChild();
    }
    end = next;
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
    // frameRate(5);
    background(51);

    for( var i=0; i<resolution; ++i ) {

        var next = sun;
        while( next ) {
            next.update();
            //next.render();
            next = next.child;
        }

        // 패스를 기록.

        path.push( createVector(end.x,end.y) );
        if( path.length > 100000) {
            path.splice(0,1);
        }
        v.paths = path.length;
    }

    // 패스 드로잉

    beginShape();
    stroke(255,0,255);
    strokeWeight(2);
    noFill();
    for( var pos of path ) {
        vertex(pos.x, pos.y);
    }
    endShape();
}


// -----------------------------------------------------------------
// 프로젝트 전용 함수들
// -----------------------------------------------------------------

