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
    subTitle    = '스팟이미지 위에 적용';

    referUrls.push({
        text:'',
        link:''
    });


    defaultCanvasWidth  = 800;
    defaultCanvasHeight = 450;
}

// -----------------------------------------------------------------
// 프로젝트 전용 변수들
// -----------------------------------------------------------------
var circles = [];
var spots = [];
var img;

// -----------------------------------------------------------------
// 사전 작업 ( preload )
// -----------------------------------------------------------------

function awake () {

    img = loadImage("../../../../images/2018.jpg");
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


    img.loadPixels();
    for( var x=0; x<img.width; ++x ) {
        for( var y=0; y<img.height; ++y ) {
            var index = (x+y*img.width)*4;
            var r = img.pixels[index+0];
            var g = img.pixels[index+1];
            var b = img.pixels[index+2];
            var c = color(r,g,b);
            var bright = brightness(c);
            if( bright > 1 ) {
                spots.push( {x:x,y:y} );
            }
        }
    }
    console.log(spots.length);
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

    var total = 1;
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

    var r = floor(random(0,spots.length));
    var spot = spots[r];

    var x = spot.x;
    var y = spot.y;

    var valid = true;
    for( var c of circles ) {
        var d = dist( x, y, c.x, c.y );
        if( d < c.r+2 ) {
            valid = false;
            break;
        }
    }

    if( valid ) {
        return new AnimatedCircle( x, y );
    }
    return null;
}