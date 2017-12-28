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
var bgImage;
var particles = [];

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    bgImage = loadImage('../../../images/hstar.jpg');
}

function setup () {

    createCanvas(bgImage.width,bgImage.height);

    background(0);

    for( var i=0; i<100; ++i ) {
        particles[i] = new Particle();
    }
}


function draw () {

    //background(0);

    //image(bgImage, 0, 0, width, height);
    for( var i=0; i<particles.length; ++i ) {

        particles[i].update();
        particles[i].display();
    }

}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

