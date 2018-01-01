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
    createP('3D로 전환하기');
    createP('');
}

function setup () {

    createCanvas(800,450,WEBGL);

    sun = new Planet( 50, 0, 0 );
    sun.spawnMoons( 5, 1 );

}

function draw () {

	noStroke();
    background(0);

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
