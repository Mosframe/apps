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
var x = 0.01;
var y = 0;
var z = 0;

var a = 10;
var b = 28;
var c = 8.0/3.0;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','The Lorenz Attractor : 로렌즈 어트렉터');
    createDiv('로렌즈 방적식 : 3차원 공간상에서 대기의 대류를 나타내는 간단한 비선형 동역학계이다.');
    createA('https://en.wikipedia.org/wiki/Lorenz_system','Lorenz system');
    createDiv('3D로 구현');
    createDiv('');
}

function setup () {

    createCanvas(800,450,WEBGL);
    //frameRate(1);

    background(0);
}

function draw () {

    var dt = 0.01;

    var dx = ( a * (y - x)      ) * dt;
    var dy = ( x * (b - z) - y  ) * dt;
    var dz = ( x * y - c * z    ) * dt;

    x = x + dx;
    y = y + dy;
    z = z + dz;

    // console.log(x,y,z);

    //translate(width/2,height/2);
    scale(5);
    stroke(255);
    beginShape(POINTS);
    vertex(x,y,z);
    endShape();

}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------
