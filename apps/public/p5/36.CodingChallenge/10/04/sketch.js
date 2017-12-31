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
var x = 0.01;
var y = 0;
var z = 0;

var a = 10;
var b = 28;
var c = 8.0/3.0;

var points = [];

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','The Lorenz Attractor : 로렌즈 어트렉터');
    createDiv('로렌즈 방적식 : 3차원 공간상에서 대기의 대류를 나타내는 간단한 비선형 동역학계이다.');
    createA('https://en.wikipedia.org/wiki/Lorenz_system','Lorenz system');
    createDiv('랜덤 노이즈 적용');
    createDiv('');
}

function setup () {

    createCanvas(800,450,WEBGL);
    //frameRate(1);

    colorMode(HSB);

}

function draw () {

    background(0);

    // camera

    {
        // camera([x],[y],[z],[centerX],[centerY],[centerZ],[upX],[upY],[upZ])
        let x = cos(map(mouseX,0,width,-PI,PI))*500;
        let y = map(mouseY,0,height,-500,500);
        let z = sin(map(mouseX,0,width,-PI,PI))*500;
        camera(x, y, z, 0, 0, 0, 0, 1, 0 );
    }

    var dt = 0.01;

    var dx = ( a * (y - x)      ) * dt;
    var dy = ( x * (b - z) - y  ) * dt;
    var dz = ( x * y - c * z    ) * dt;

    x = x + dx;
    y = y + dy;
    z = z + dz;

    points.push( createVector(x,y,z) );
    if( points.length > 10000 ) {
        points.splice(0,1);
    }

    // console.log(x,y,z);

    scale(5);
    stroke(255);
    noFill();

    var hu = 0;
    for( var i=1; i<points.length; ++i ) {

        stroke(hu, 255,255);

        beginShape(LINES);
        var v1 = points[i-1];
        var v2 = points[i-0];
        vertex(v1.x,v1.y,v1.z);
        vertex(v2.x,v2.y,v2.z);
        endShape();

        var offset = p5.Vector.random3D();
        offset.mult(0.1);
        points[i-0].add( offset );


        hu += 0.1;
        if( hu > 255 ) {
            hu = 0;
        }
    }

}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------
