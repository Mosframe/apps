/**
 * sketch.js
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 * Sawtooth wave : https://en.wikipedia.org/wiki/Sawtooth_wave
 * ADSR Envelope : https://en.wikipedia.org/wiki/Synthesizer#Attack_Decay_Sustain_Release_.28ADSR.29_envelope
 *
 * @author : https://github.com/Mosframe
 */

/*
A : Attack time : 건반 키를 누른후 처음부터 끝까지 올라가는 시간
D : Decay time : Attack time에서 지정된 지속(Sustain) 래벨로 떨어지는 걸리는 시간
S : Sustain time : 건반 키가 릴리즈될때까지 지속시간
R : Release time : 건반 키를 놓은 후 0으로 떨어지는 시간
*/


// -----------------------------------------------------------------
// 변수, 오브젝트 정의
// -----------------------------------------------------------------
var wave
var button;
var slider;
var playing;

var env;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function setup () {

    createCanvas(100,100);

    slider = createSlider(100, 1200, 440);

    env = new p5.Env();
    env.setADSR( 0.05, 0.1, 0.5, 1 );
    env.setRange( 1.2, 0 );

    wave  = new p5.Oscillator();

    wave.setType('sine');
    wave.start();
    wave.freq(440);
    wave.amp(env);

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

    env.play();

    /*
    if( !playing ) {
        wave.amp(0.5, 1);
        wave.freq(440);
        playing = true;
    } else {
        wave.amp(0, 1);
        playing = false;
    }
    */
}