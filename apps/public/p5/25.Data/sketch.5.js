/**
 * sketch.js
 *
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 * 위도,경도 API : http://api.open-notify.org/iss-now.json
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 변수, 오브젝트 정의
// -----------------------------------------------------------------
var lineX=0;
var url = `http://api.open-notify.org/iss-now.json`;

var issX;
var issY;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function setup () {

    createCanvas(600, 400);

    setInterval(askISS, 1000);
}

function draw () {

    background(51);

    fill(255);
    ellipse( issX, issY, 24, 24 );

    stroke(255);
    line(lineX, 0, lineX, height);
    lineX += 5;
    if( lineX > width ) {
        lineX = 0;
    }
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

function askISS () {

    loadJSON(url, gotData, 'jsonp');
}

function gotData ( data ) {

    console.log(data);
    console.log(data.iss_position.latitude);

    var latitude    = data.iss_position.latitude;
    var longitude   = data.iss_position.longitude;

    issX = map(latitude, -90, 90, 0, width );
    issY = map(longitude, -90, 90, 0, height );
}