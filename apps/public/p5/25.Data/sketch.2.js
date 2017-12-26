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
var data;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    data = loadJSON("birds.json");
}

function setup () {

    noCanvas();
    //createCanvas(400, 400);

    //var bird = data.birds[1].members[2];
    //createP(bird);

    var birds = data.birds;

    for( var i=0; i<birds.length; ++i ) {
        createElement('h1', birds[i].family);
        var members = birds[i].members;
        for( var j=0; j<members.length; ++j ) {
            createDiv(members[j]);
        }
    }
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------