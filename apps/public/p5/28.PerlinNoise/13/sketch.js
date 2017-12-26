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
var fr;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function setup () {

    createCanvas(400, 400);
    cols = floor(width/scl);
    rows = floor(height/scl);
    fr = createP('');
}


function draw () {

    background(255);

    randomSeed(10);

    var yOffset = 0;
    for( var y=0; y<rows; ++y ) {
        for( var x=0; x<cols; ++x ) {

            // 랜덤 벡터

            //var v = p5.Vector.fromAngle(0);
            //var v = p5.Vector.fromAngle(PI/2);
            //var v = p5.Vector.fromAngle(PI/6);
            var v = p5.Vector.fromAngle(random(TWO_PI));

            stroke(0);

            push();

            translate(x*scl, y*scl);
            rotate(v.heading());
            line(0,0,scl,0);

            pop();
        }
        yOffset += inc;
    }

    fr.html(floor(frameRate()));
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

