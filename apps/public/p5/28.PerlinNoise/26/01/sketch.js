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
var fps;



// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function setup () {

    fps = createP('');

    createCanvas(200, 200);
    background(51);

    translate( width/2, height/2 );

    var r = 100;
    stroke(255);
    fill(255,50);
    strokeWeight(1);
    beginShape();
    for( var a=-PI/2; a<PI/2; a+= 0.1 ) {

        var x = r * cos(a);
        var y = r * sin(a);

        //point(x,y);
        vertex(x,y);
        --r; // 안쪽으로 말리들게
    }
    endShape();

}


function draw () {

    //background(0);


    fps.html(floor(frameRate()));
}


// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

