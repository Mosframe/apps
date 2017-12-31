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
var cellScale = 20;
var cols;
var rows;
var w = 1200;
var h = 900;

var terrain = [];

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Terrain Generator : 지형 생성기');
    createP('기본 프레임워크 구현');
    createP('');
}

function setup () {

    createCanvas(600,600,WEBGL);
    //frameRate(1);

    cols = w / cellScale;
    rows = h / cellScale;

    for( var x=0; x<cols; ++x ) {
        terrain[x] = [];
        for( var y=0; y<rows; ++y ) {
            terrain[x][y] = random(-10,10);
        }
    }
}

function draw () {

    background(0);

    // camera

    // camera([x],[y],[z],[centerX],[centerY],[centerZ],[upX],[upY],[upZ])
    var x = 0;//cos(map(mouseX,0,width,-PI,PI))*500;
    var y = 0; //map(mouseY,0,height,-500,500);
    var z = 500;//sin(map(mouseX,0,width,-PI,PI))*500;
    camera(x, y, z, 0, 0, 0, 0, 1, 0 );

    // light

    ambientLight(0);
    var density = 0.5;
	var dirY = (mouseY/height - 0.5) * density;
	var dirX = (mouseX/width  - 0.5) * density;
    //directionalLight(255, 255, 255, dirX, dirY, 1);
    // pointLight(r,g,b,x,y,z)
    pointLight( 255, 255, 255, 0, 0, 0 );


    // terrain

    stroke(255);
    noFill();

    rotateX(PI/3);
    translate( -w/2, -h/2, 0 );

    for( var y=0; y<rows-1; ++y ) {
        beginShape(TRIANGLE_STRIP);
        for( var x=0; x<cols; ++x ) {

            //rect( x*cellScale, y*cellScale, cellScale, cellScale );
            vertex( x*cellScale, (y+0)*cellScale, terrain[x][y+0] );
            vertex( x*cellScale, (y+1)*cellScale, terrain[x][y+1] );
        }
        endShape();
    }
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------
