/**
 * sketch.js
 *
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 * 로즈 메스메틱스 레퍼런스 : https://en.wikipedia.org/wiki/Rose_(mathematics)
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 변수, 오브젝트 정의
// -----------------------------------------------------------------
var fps;

var dxSlider;
var yoff = 0;


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function setup () {

    fps = createP('');

    dxSlider = createSlider(1,100,10);
    createP('');

    createCanvas(200, 200);
}


function draw () {

    background(51);

    push();
    translate( width/2, height/2 );
    rotate(PI/2);

    stroke(255);
    fill(255,50);
    strokeWeight(1);

    // 날개 생성

    var da = PI / 100;
    var dx = dxSlider.value()*0.01; // 0.1;

    var xoff = 0;
    beginShape();

    // 오른쪽 날개

    for( var a=-PI/2; a <= PI/2; a+= da ) {

        var n = noise(xoff,yoff);
        var r = sin(2*a) * map(n, 0, 1, 50, 100);
        var x = r * cos(a);
        var y = sin(yoff) * r * sin(a);
        xoff += dx;

        //point(x,y);
        vertex(x,y);
    }

    // 왼쪽 날개

    for( var a= PI/2; a <= 3*PI/2; a += da ) {

        var n = noise(xoff,yoff);
        var r = sin(2*a) * map(n, 0, 1, 50, 100);
        var x = r * cos(a);
        var y = sin(yoff) * r * sin(a);
        xoff -= dx;

        //point(x,y);
        vertex(x,y);
    }
    endShape();
    pop();

    yoff += 0.1;


    fps.html(floor(frameRate()));
}


// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

