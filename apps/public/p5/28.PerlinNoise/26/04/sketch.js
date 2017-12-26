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

    // 날개 생성

    var da = PI / 100;
    var xoff = 0;
    beginShape();

    // 오른쪽 날개

    for( var a=-PI/2; a <= PI/2; a+= da ) {

        //var n = noise(xoff);
        var r = cos(2*a)*100;//map(n, 0, 1, 50, 100);
        var x = r * cos(a);
        var y = r * sin(a);
        xoff += 0.1;

        //point(x,y);
        vertex(x,y);
    }

    // 왼쪽 날개

    for( var a= PI/2; a <= 3*PI/2; a += da ) {

        //var n = noise(xoff);
        var r = cos(2*a)*100;//map(n, 0, 1, 50, 100);
        var x = r * cos(a);
        var y = r * sin(a);
        xoff -= 0.1;

        //point(x,y);
        vertex(x,y);
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

