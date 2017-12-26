/**
 * sketch.js
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 * Sawtooth wave : https://en.wikipedia.org/wiki/Sawtooth_wave
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 변수, 오브젝트 정의
// -----------------------------------------------------------------
var wave
var button;
var slider;
var playing;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    //song = loadSound('../../../sounds/rainbow1.mp3');
}

function setup () {

    createCanvas(100,100);

    slider = createSlider(100, 1200, 440);

    wave  = new p5.Oscillator();

    //wave.setType('sine');
    wave.setType('triangle');

    wave.start();
    wave.amp(0);
    wave.freq(440);

    button = createButton('play/pause');
    button.mousePressed(toggle);

}


function draw () {

    wave.freq( slider.value() );

    if( playing ) {
        background(255,0,255);
    } else {
        background(51);
    }

}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------


function toggle () {

    if( !playing ) {
        //wave.start();
        //wave.amp(0.5);
        wave.amp(0.5, 1);
        wave.freq(440);
        playing = true;
    } else {
        //wave.stop();
        //wave.amp(0);
        wave.amp(0, 1);
        playing = false;
    }
}