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
var grivity = 0.1;
var particles = [];


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

// 설정

function setup () {

    createP("파티클 생성: 마우스 좌클릭");
    createCanvas(600, 600);
}

function mousePressed () {

    particles.push( new Particle(mouseX,mouseY) );
}

// 디스플레이

function draw () {

    background(200);
    for( var i=0; i<particles.length; ++i ) {

        particles[i].update();
        particles[i].show();
    }

    //line( frameCount, 0, frameCount, height );
}


// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

