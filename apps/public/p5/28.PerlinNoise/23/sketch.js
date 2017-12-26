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
var scl = 10;
var cols;
var rows;

var zOffset = 0;

var fps;

var particles = [];

var flowfield;

var scaleSlider;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function setup () {

    fps = createP('');
    scaleSlider = createSlider(0,30,20);
    createP('');

    createCanvas(800, 600);
    cols = floor(width/scl);
    rows = floor(height/scl);

    flowfield = new Array(cols * rows);

    for( var i=0; i<2500; ++i) {
        particles[i] = new Particle();
    }
    background(255);

}


function draw () {

    //background(255);

    scl = scaleSlider.value();

    var yOffset = 0;
    for( var y=0; y<rows; ++y ) {
        var xOffset = 0;
        for( var x=0; x<cols; ++x ) {

            // 회전각에 펄린 노이즈 적용

            var angle   = noise(xOffset,yOffset,zOffset) * TWO_PI * 4;
            var v       = p5.Vector.fromAngle(angle);

            v.setMag(1); // 벡터 속도를 조절한다.

            // 벡터 방향을 저장

            var index   = x + y * cols;
            flowfield[index] = v;

            /*
            방향 기즈모
            stroke(0,50);
            strokeWeight(1);

            push();

            translate(x*scl, y*scl);
            rotate(v.heading());
            line(0,0,scl,0);

            pop();
            */

            xOffset += inc;
        }
        yOffset += inc;

        zOffset += 0.0003;
    }

    for( var i=0; i<particles.length; ++i ) {

        particles[i].follow(flowfield);
        particles[i].update();
        particles[i].edges();
        particles[i].show();
    }

    fps.html(floor(frameRate()));
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

