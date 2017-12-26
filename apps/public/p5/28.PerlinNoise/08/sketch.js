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
var inc = 0.01;
var start = 0;

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

    // 평면노이즈값을 만들때 평면에서는 디테일값을 조절하기가
    // 어려움으로 여기서 조정해보고 평면에 적용한다.
    //noiseDetail(1);
    //noiseDetail(8);
    //noiseDetail(8,0.2);
    //noiseDetail(8,0.8);

    var xOffset = start;

    stroke(255);
    noFill();
    beginShape();
    for( var x=0; x<width; ++x ) {
        stroke(255);
        //var y = random(height);
        //var y = noise(xOffset) * height;
        //var y = height/2 + sin(xOffset) * height/2;

        //var s = map(sin(xOffset), -1, 1, 0, height);
        //var n = map(noise(xOffset),0,1,-50,50);
        //var y = s + n;

        var s = map(sin(xOffset), -1, 1, -50, 50);
        var n = map(noise(xOffset),0,1, 0, height);
        var y = s + n;

        vertex(x,y);

        xOffset += inc;
    }
    endShape();

    start += inc;

    //noLoop();
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

