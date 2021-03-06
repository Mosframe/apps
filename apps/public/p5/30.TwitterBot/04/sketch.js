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


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function setup () {

    createCanvas(640,360);
    background(51);

    for( var i=0; i<5000; ++i ) {
        var x = random(width);
        var y = random(height);
        var r = random(100,255);
        var b = random(100,255);
        noStroke();
        fill(r,0,b, 100);
        ellipse(x,y,16,16);
    }

    //save('output.png'); // 캔버스 파일로 저장
}


function draw () {

}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------
