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

    title       = 'Attraction and Repulsion Forces : 인력과 반발력의 세력';
    subTitle    = '반발력 추가, 파티클 동적으로 추가';

    referUrls.push({
        text:'',
        link:''
    });

    defaultCanvasWidth  = 400;
    defaultCanvasHeight = 400;
}

// -----------------------------------------------------------------
// 프로젝트 전용 변수들
// -----------------------------------------------------------------
var attractors = [];
var particles = [];

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
    // background(51);
    // colorMode(HSB);
    // angleMode(DEGREES);
    // removeCanvas();


    // 파티클

    //for( var i=0; i<100; ++i ) {
    //    particles.push( new Particle(random(width),random(height)) );
    //    //particles.push( new Particle(width/2,height/2) );
    //}

    // 어트랙터

    //attractor = createVector(width/2,height/2);
    //for( var i=0; i<10; ++i ) {
    //    attractors.push( createVector(random(width),random(height)) );
    //}
 }

// -----------------------------------------------------------------
// 입력
// -----------------------------------------------------------------

function keyPressed () {

}

function  keyReleased () {

}

function mousePressed () {

    attractors.push( createVector(mouseX,mouseY) );
    v.attractors = attractors.length;
}

// -----------------------------------------------------------------
// 프레임 갱신
// -----------------------------------------------------------------

function update () {

    particles.push( new Particle(random(width),random(height)) );
    if( particles.length>1000 ) {
        particles.splice(0,1);
    }

    v.particles = particles.length;

}

// -----------------------------------------------------------------
// 프레임 렌더링
// -----------------------------------------------------------------

function render () {

    // noLoop();
    // colorMode(HSB);
    // frameRate(5);
    background(51);

    // 어트랙터 드로잉

    strokeWeight(4);
    for( var i=0; i<attractors.length; ++i ) {
        stroke(0,255,0);
        point(attractors[i].x,attractors[i].y);
    }

    // 파티클

    for( var i=0; i<particles.length; ++i ) {
        var particle = particles[i];

        // 파티클에 모든 어트랙터 적용

        for( var j=0; j<attractors.length; ++j ) {
            particle.attracted( attractors[j] );
        }
        particle.update();
        particle.render();
    }

}


// -----------------------------------------------------------------
// 프로젝트 전용 함수들
// -----------------------------------------------------------------
