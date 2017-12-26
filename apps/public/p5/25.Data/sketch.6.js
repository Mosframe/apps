/**
 * sketch.js
 *
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 * 영어단어 메터데이터 API : http://developer.wordnik.com
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 변수, 오브젝트 정의
// -----------------------------------------------------------------
var lineX   = 0;
var word    = 'rainbow';
var api     = 'http://api.wordnik.com/v4/word.json/';
var apiParam= '/relatedWords?useCanonical=false&limitPerRelationshipType=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';

var link;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function setup () {

    noCanvas();
    //createCanvas(600, 400);

    link = createA( '#', word );
    link.mousePressed(askWordnic);

    //setInterval(askISS, 1000);
}

function draw () {

    background(51);

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

function askWordnic () {

    var url = api + word + apiParam;
    loadJSON( url, gotData, 'jsonp' );
}

function gotData ( data ) {

    console.log(data);
    console.log(data[0].words[0]);

    var dataIndex = floor(random(0,data.length));
    var wordIndex = floor(random(0,data[dataIndex].words.length));

    word = data[ dataIndex ].words[ wordIndex ];
    link.html(word);

}