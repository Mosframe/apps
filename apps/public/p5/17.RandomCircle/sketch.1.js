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
var circles = [];

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

// 설정

function setup () {

    //createP("파티클 생성: 마우스 좌클릭");
    createCanvas(640, 360);


    // 원들을 중첩되지 않도록 무작위로 정해진 수량만큼 생성한다.

    var protection = 0;

    while( circles.length < 300 ) {

        var circle = {

            x: random(width),
            y: random(height),
            r: random(6,36)
        }

        var overlapping = false;
        for( var j=0; j<circles.length; ++j ) {
            var other = circles[j];
            var d = dist(circle.x, circle.y, other.x, other.y );
            if( d < circle.r + other.r ) {
                overlapping = true;
                break;
            }
        }

        if( !overlapping ) {
            circles.push( circle );
        }

        // 무한루프 방지
        ++protection;
        if( protection > 10000 ) {
            break;
        }
    }


    for( var i=0; i<circles.length; ++i ) {

        fill(255,0,150,100);
        noStroke();
        ellipse(circles[i].x,circles[i].y,circles[i].r*2,circles[i].r*2);
    }
}

function mousePressed () {

}

// 디스플레이

function draw () {


}


// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

