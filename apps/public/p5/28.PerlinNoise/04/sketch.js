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
var xOffset = 0;
var yOffset = 10000;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function setup () {

    createCanvas(400, 400);
}


function draw () {

    background(51);

    //var x = map(noise(xOffset), 0, 1, 0, width);
    //var y = map(noise(yOffset), 0, 1, 0, height);
    //xOffset += 0.01;
    //yOffset += 0.01;
    //ellipse(x, y, 24, 24);

    stroke(255);
    noFill();
    beginShape();
    for( var x=0; x<width; ++x ) {
        stroke(255);
        vertex(x,random(height));
    }
    endShape();

    noLoop();
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

