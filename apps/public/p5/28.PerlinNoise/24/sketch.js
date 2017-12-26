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
var fps;

var land;
var theta = 0.0;


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function setup () {

    fps = createP('');

    createCanvas(800, 600, WEBGL);

    land = new Landscape(40,1000,1000);
}


function draw () {

    //var a = map(mouseX,0, width, 0, TWO_PI);

    background(255);
    push();
    translate(0,height/2,-250);
    rotateX(PI/2);
    //rotateZ(theta);
    land.rander();
    pop();

    land.calculate();

    theta += 0.0025;

    fps.html(floor(frameRate()));
}


// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

