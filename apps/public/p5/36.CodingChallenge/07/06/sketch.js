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
var sun;
var radius = 200;
// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Solar System : 태양계 구현');
    createP('카메라 설정');
    createP('');
}

function setup () {

    createCanvas(800,450,WEBGL);

    sun = new Planet( 50, 0, 0 );
    sun.spawnMoons( 4, 1 );

}

function draw () {

    background(0);

    // camera

    // camera([x],[y],[z],[centerX],[centerY],[centerZ],[upX],[upY],[upZ])
    var x = cos(map(mouseX,0,width,-PI,PI))*500;
    var y = map(mouseY,0,height,-500,500);
    var z = sin(map(mouseX,0,width,-PI,PI))*500;
    camera(x, y, z, 0, 0, 0, 0, 1, 0 );

    // light

    ambientLight(50);
	var dirY = (mouseY/height - 0.5) * 1;
	var dirX = (mouseX/width  - 0.5) * 1;
    directionalLight(255, 255, 255, dirX, dirY, 1);


    // planets

    //translate( width/2, height/2 );
    sun.show();
    sun.orbit();
}


// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------
