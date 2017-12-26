/**
 * sketch.js
 *
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 변수, 오브젝트 정의
// -----------------------------------------------------------------
var lineX=0;
var spaceData;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function setup () {

    createCanvas(200, 200);

    //loadJSON("http://api.open-notify.org/astros.json",gotData);
    loadJSON("http://api.open-notify.org/astros.json", gotData, 'jsonp');
}

function draw () {

    background(0);
    if( spaceData ) {
        randomSeed(4);
        for( var i=0; i<spaceData.number; ++i ) {
            fill(255);
            ellipse( random(width), random(height), 16, 16 );
        }
    }
    stroke(255);
    line(lineX,0,lineX,height)
    ++lineX;
    if( lineX > width ) {
        lineX = 0;
    }
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

function gotData ( data ) {

    // console.log(data);
    spaceData = data;
}