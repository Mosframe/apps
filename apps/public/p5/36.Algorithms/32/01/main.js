/**
 * main.js
 *
 * p5.js    : http://p5js.org/reference
 * web      : http://developer.mozilla.org
 * @author  : https://github.com/Mosframe
 */

// 프로젝트 설명

function discription () {

    createElement('h1','Blobby : 얼룩진 작은 방울, 슬라임');
    createDiv('');
    createA('','');
    createDiv('');
    createDiv('기본 프레임워크 설정');
}

// 전역 변수들

var yoff = 0.0;
var mode = 0;

// 사전 작업 설정

function awake () {

    createButton('sin').mousePressed(()=>{
        mode = 0;
    });
    createButton('noise').mousePressed(()=>{
        mode = 1;
    });
}

// 프로세스 시작 설정

function start () {

    // pixelDensity(1);
    //frameRate(5);
    background(0);
    //colorMode(HSB);
    // angleMode(DEGREES);

}

// 프레임 갱신

function update () {

}

// 프레임 렌더링
function render () {

    // noLoop();
    // colorMode(HSB);
    background( 0 );

    translate(width / 2, height / 2);

    var radius = 150;

    beginShape();
    var xoff = 0;
    for (var a = 0; a < TWO_PI; a += 0.1) {
        if( mode == 0 ) {
            var offset = map(sin( a*5 + frameCount * 0.01), -1, 1, -25, 25);
        }
        else
        if( mode == 1 ) {
            var offset = map(noise(xoff, yoff), 0, 1, -25, 25);
        }
        var r = radius + offset;
        var x = r * cos(a);
        var y = r * sin(a);
        vertex(x, y);
        xoff += 0.1;
        //ellipse(x, y, 4, 4);
    }
    endShape();

    yoff += 0.01;

}
