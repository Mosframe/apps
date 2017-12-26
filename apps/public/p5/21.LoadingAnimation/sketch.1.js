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
//var imgs = [];
var songs = [];
var angle = 0;
var loading = true;
var totalSongs = 3;
var counter = 0;


// -----------------------------------------------------------------
// p5.js  함수들
// -----------------------------------------------------------------

function preload () {
}

function setup () {

    createCanvas(300,300);
    console.log( floor(millis()) + ' miliseconds' );

    for( var i=0; i<totalSongs; ++i ) {
        rainbowSong( `../../sounds/rainbow${i+1}.mp3` );
    }
}

function draw () {

    background(51);

    if( loading ) {

        stroke(255);
        noFill();
        rect(10,10,200,20);

        noStroke();
        fill(255,100);
        var w = 200 * counter / totalSongs;
        rect(10,10,w,20);

        translate(width/2, height/2);
        rotate(angle);
        strokeWeight(4);
        stroke(255);
        line(0,0,100,0);

        angle += 0.1;
    } else {
        background(0,255,0);
    }
}


// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

function rainbowSong ( filename ) {

    loadSound( filename, soundLoaded, error, progress );

    function soundLoaded (sound) {

        console.log( filename );

        songs.push(sound);
        //sound.play();

        ++counter;
        if( counter == totalSongs ) {
            loading = false;
        }
    }

    function progress ( percent ) {

        console.log( "Percent: " + floor(percent*100) );
    }

    function error ( err ) {

        console.log(err);
    }
}

