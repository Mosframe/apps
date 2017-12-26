/**
 * sketch.js
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 * 고속퓨리변환(FFT): https://en.wikipedia.org/wiki/Fast_Fourier_transform
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 변수, 오브젝트 정의
// -----------------------------------------------------------------
var song;
var fft;
var button;
var w;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    song = loadSound( '../../../sounds/Music/Music-01.mp3' );
}

function setup () {

    createCanvas(256,256);

    angleMode(DEGREES);

    button = createButton('toggle');
    button.mousePressed(toggleSong);

    //song.play();

    fft = new p5.FFT(0.9, 64);
    w = width / 64;
}


function draw () {

    background(0);
    colorMode(HSB);

    var spectrum = fft.analyze();
    //console.log(spectrum);
    //console.log(spectrum.length);

    //stroke(255);
    noStroke();
    for( var i=0; i<spectrum.length; ++i ) {
        var amp = spectrum[i];
        var y = map(amp, 0, 256, height, 0);
        fill(i,255,255);
        rect( i*w, y, w-2, height-y );
    }

    stroke(255);
    noFill();

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