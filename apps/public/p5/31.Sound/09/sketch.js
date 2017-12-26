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

    song = loadSound( '../../../sounds/music/Music-01.mp3' );
}

function setup () {

    createCanvas(256,256);

    colorMode(HSB);
    angleMode(DEGREES);

    button = createButton('toggle');
    button.mousePressed(toggleSong);

    //song.play();

    fft = new p5.FFT(0.9, 128);
}


function draw () {

    background(0);
    var spectrum = fft.analyze();
    //console.log(spectrum);
    //stroke(255);
    noStroke();
    translate(width / 2, height / 2);
    //beginShape();
    for (var i = 0; i < spectrum.length; i++) {
      var angle = map(i, 0, spectrum.length, 0, 360);
      var amp = spectrum[i];
      var r = map(amp, 0, 256, 20, 100);
      //fill(i, 255, 255);
      var x = r * cos(angle);
      var y = r * sin(angle);
      stroke(i, 255, 255);
      line(0, 0, x, y);
      //vertex(x, y);
      //var y = map(amp, 0, 256, height, 0);
      //rect(i * w, y, w - 2, height - y);
    }
    //endShape();
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