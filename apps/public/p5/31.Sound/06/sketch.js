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

    button = createButton('toggle');
    button.mousePressed(toggleSong);

    //song.play();

    amp = new p5.Amplitude();
}


function draw () {

    background(0);

    push();

    var vol = amp.getLevel();
    volHistory.push(vol);
    stroke(255);
    noFill();

    var currentY = map( vol, 0, 1, height, 0 );
    translate(0, height/2 - currentY );


    beginShape();
    for( var i=0; i<volHistory.length; ++i ) {
        var y = map( volHistory[i], 0, 1, height, 0 );
        vertex(i,y);
    }
    endShape();
    pop();

    if( volHistory.length > width - 50 ) {
        volHistory.splice(0,1);
    }

    stroke(255,0,0);
    line(volHistory.length,0,volHistory.length,height);

    //ellipse( width/2, height/2, width, vol*height );

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