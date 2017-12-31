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
var drops = [];

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Purple Rain  : 보라색 비');
    createP('');
    createP('무작위로 비 생성');
}

function setup () {

    createCanvas(640,360);

    for( var i=0; i<100; ++i ) {
        drops[i] = new Drop();
    }

}

function draw () {

    background(230, 230, 250);

    for( var i=0; i<drops.length; ++i ) {
        drops[i].fall();
        drops[i].show();
    }
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------
