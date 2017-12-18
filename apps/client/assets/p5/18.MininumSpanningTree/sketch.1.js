/**
 * sketch.js
 *
 * Prim's Algorithm 구현
 * 가까운 노드끼리 연결하는 알고리즘
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 변수, 오브젝트 정의
// -----------------------------------------------------------------
var vertices = [];

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

// 설정

function setup () {

    createP("노드 생성: 마우스 좌클릭");

    createCanvas(640, 360);

    for( var i=0; i<20; ++i ) {
        var v = createVector( random(width), random(height) );
        vertices.push(v);
    }
}

function mousePressed () {

    var v = createVector( mouseX, mouseY );
    vertices.push(v);
}

// 디스플레이

function draw () {

    background(51);

    var reached = [];
    var unreached = [];

    // 초기화

    for( var i=0; i<vertices.length; ++i ) {
        unreached.push(vertices[i]);
    }

    // 가까운 노드 끼리 연결한다.

    reached.push( unreached[0] );
    unreached.splice(0, 1);

    while( unreached.length>0 ) {

        var record = 100000;
        var rIndex;
        var uIndex;

        for( var i=0; i<reached.length; ++i ) {
            for( var j=0; j<unreached.length; ++j ) {

                var v1 = reached[i];
                var v2 = unreached[j];
                var d = dist(v1.x, v1.y, v2.x, v2.y);

                if( d < record ) {
                    record = d;
                    rIndex = i;
                    uIndex = j;
                }
            }
        }

        stroke(255);
        strokeWeight(2);
        line(reached[rIndex].x, reached[rIndex].y, unreached[uIndex].x, unreached[uIndex].y);

        reached.push( unreached[uIndex] );
        unreached.splice(uIndex, 1);
    }


    fill(255);
    for( var i=0; i<vertices.length; ++i ) {
        ellipse(vertices[i].x, vertices[i].y, 16, 16);
    }
}


// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

