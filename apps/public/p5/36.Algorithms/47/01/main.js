/**
 * main.js
 *
 * p5.js    : http://p5js.org/reference
 * web      : http://developer.mozilla.org
 * @author  : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 환경설정 변수들 설정
// -----------------------------------------------------------------

function description () {

    title       = 'Animated Circle Packing : 에니메이션된 원 팩킹 : 디자인 패턴 제작';
    subTitle    = '기본 프레임워크 설정';

    referUrls.push({
        text:'',
        link:''
    });


    defaultCanvasWidth  = 640;
    defaultCanvasHeight = 360;
}

// -----------------------------------------------------------------
// 프로젝트 전용 변수들
// -----------------------------------------------------------------
var circles = [];

// -----------------------------------------------------------------
// 사전 작업 ( preload )
// -----------------------------------------------------------------

function awake () {

}

// -----------------------------------------------------------------
// 프레임 갱신 시작 ( setup )
// -----------------------------------------------------------------

function start () {

    // pixelDensity(1);
    // frameRate(5);
    // background(0);
    // colorMode(HSB);
    // angleMode(DEGREES);
    // removeCanvas();

 }

// -----------------------------------------------------------------
// 입력
// -----------------------------------------------------------------

function keyPressed () {

}

function  keyReleased () {

}

// -----------------------------------------------------------------
// 프레임 갱신
// -----------------------------------------------------------------

function update () {


}

// -----------------------------------------------------------------
// 프레임 렌더링
// -----------------------------------------------------------------

function render () {

    // noLoop();
    // colorMode(HSB);
    // frameRate(5);

    background( 0 );

    var total = 10;
    var count = 0;
    var attempts = 0;

    while( count < total ) {

        var newC = newCircle();
        if( newC != null ) {
            circles.push(newC);
            ++count;
        }
        ++attempts;
        if(attempts > 1000 ) {
            noLoop();
            console.log('FINISHED!');
            break;
        }
    }



    for( var c of circles ) {

        if( c.growing ) {

            // 스크린 오버 방지

            if( c.edges() ) {
                c.growing = false;
            } else {

                // 중첩방지

                var overlapping = false;
                for( var other of circles ) {

                    if( c != other ) {

                        var d = dist(c.x,c.y,other.x,other.y);
                        if( d-2 < c.r + other.r ) {
                            c.growing = false;
                            break;
                        }
                    }
                }
            }
        }
        c.rander();
        c.grow();
    }

}


// -----------------------------------------------------------------
// 프로젝트 전용 함수들
// -----------------------------------------------------------------


function newCircle () {

    var x = random(width);
    var y = random(height);

    var valid = true;
    for( var c of circles ) {
        var d = dist( x, y, c.x, c.y );
        if( d < c.r ) {
            valid = false;
            break;
        }
    }

    if( valid ) {
        return new AnimatedCircle( x, y );
    }
    return null;
}