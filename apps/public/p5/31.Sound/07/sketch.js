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
var song;
var amp;
var button;

var volHistory = [];

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    song = loadSound( '../../../sounds/music/Music-01.mp3' );
}

function setup () {

    createCanvas(200,200);

    angleMode(DEGREES);

    button = createButton('toggle');
    button.mousePressed(toggleSong);

    //song.play();

    amp = new p5.Amplitude();
}


function draw () {

    background(0);

    var vol = amp.getLevel();
    volHistory.push(vol);
    stroke(255);
    noFill();

    translate( width/2, height/2);

    beginShape();
    for( var i=0; i<360; ++i ) {
        var r = map( volHistory[i], 0, 1, 20, 100 );
        var x = r * cos(i);
        var y = r * sin(i);

        vertex(x,y);
    }
    endShape();

    if( volHistory.length > 360 ) {
        volHistory.splice(0,1);
    }
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------


function toggleSong () {

    if( song.isPlaying() ) {
        song.pause();
    } else {
        song.play();
    }
}