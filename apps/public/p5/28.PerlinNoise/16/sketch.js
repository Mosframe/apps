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
var inc = 0.1;
var scl = 20;
var cols;
var rows;

var zOffset = 0;

var fr;

var particles = [];

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function setup () {

    createCanvas(400, 400);
    cols = floor(width/scl);
    rows = floor(height/scl);
    fr = createP('');

    for( var i=0; i<100; ++i) {
        particles[i] = new Particle();
    }
}


function draw () {

    background(255);

    var yOffset = 0;
    for( var y=0; y<rows; ++y ) {
        var xOffset = 0;
        for( var x=0; x<cols; ++x ) {

            // 회전각에 펄린 노이즈 적용

            var angle   = noise(xOffset,yOffset,zOffset) * TWO_PI;
            var v       = p5.Vector.fromAngle(angle);

            // 방향 기즈모

            stroke(0,50);
            strokeWeight(1);

            push();

            translate(x*scl, y*scl);
            rotate(v.heading());
            line(0,0,scl,0);

            pop();

            xOffset += inc;
        }
        yOffset += inc;

        //zOffset += 0.001;
    }

    for( var i=0; i<particles.length; ++i ) {

        particles[i].update();
        particles[i].show();
        particles[i].edges();
    }

    fr.html(floor(frameRate()));
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

