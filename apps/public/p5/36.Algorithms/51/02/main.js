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

    title       = 'Islamic Star Patterns : 이슬람 스타 패턴';
    subTitle    = '배열 적용';

    referUrls.push({
        text:'Islamic Star Patterns',
        link:'http://www.cgl.uwaterloo.ca/csk/projects/starpatterns/'
    });

    referUrls.push({
        text:'Islamic Star Patterns from Polygons in Contact',
        link:'http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.90.5930&rep=rep1&type=pdf'
    });

    referUrls.push({
        text:'Points, lines, and planes',
        link:'http://paulbourke.net/geometry/pointlineplane/'
    });


    defaultCanvasWidth  = 400;
    defaultCanvasHeight = 400;
}

// -----------------------------------------------------------------
// 프로젝트 전용 변수들
// -----------------------------------------------------------------
var polys = [];
var angle = 75;
var delta = 10;

var angleSlider;
var deltaSlider;

// -----------------------------------------------------------------
// 사전 작업 ( preload )
// -----------------------------------------------------------------

function awake () {

    createSpan('angle:').parent( canvasContainer );
    angleSlider = createSlider( 0, 90, 60, 0.1 ).touchMoved( ()=>{
        angle = angleSlider.value();
    }).parent( canvasContainer );

    createSpan('delta:').parent( canvasContainer );
    deltaSlider = createSlider( 0, 25, 0, 0.1 ).touchMoved( ()=>{
        delta = deltaSlider.value();
    }).parent( canvasContainer );
}

// -----------------------------------------------------------------
// 프레임 갱신 시작 ( setup )
// -----------------------------------------------------------------

function start () {

    // pixelDensity(1);
    // frameRate(5);
    background(51);
    // colorMode(HSB);
    //angleMode(DEGREES);
    // removeCanvas();

    angle = angleSlider.value();
    delta = deltaSlider.value();



    var inc = 100;

    for( var x=0; x<width; x+=inc ) {
        for( var y=0; y<height; y+=inc ) {
            var poly = new Polygon();
            poly.addVertex(x,y);
            poly.addVertex(x+inc,y);
            poly.addVertex(x+inc,y+inc);
            poly.addVertex(x,y+inc);
            poly.close();
            polys.push(poly);
        }
    }
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

    v.angle = angle;
    v.delta = delta;
}

// -----------------------------------------------------------------
// 프레임 렌더링
// -----------------------------------------------------------------

function render () {

    // noLoop();
    // colorMode(HSB);
    // frameRate(5);
    background(51);

    for( var i=0; i<polys.length; ++i ) {
        polys[i].hankin();
        polys[i].render();
    }

}


// -----------------------------------------------------------------
// 프로젝트 전용 함수들
// -----------------------------------------------------------------
