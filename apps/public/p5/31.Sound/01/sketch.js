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
var volumeSlider;
var rateSlider;
var panSlider;
var playButton;
var stopButton;
var jumpButton;

var amp;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    //song = loadSound('../../../sounds/rainbow1.mp3');
}

function setup () {

    createCanvas(200,200);

    //song.play();

    createP('');
    volumeSlider    = createSlider( 0, 1, 0.1, 0.01 );
    rateSlider      = createSlider( 0, 1.5, 1, 0.01 );
    panSlider       = createSlider( -1, 1, 0, 0.01 );

    song = loadSound( '../../../sounds/music/Music-01.mp3', ()=>{

        //song.play();
        createP('');
        playButton = createButton('play');
        playButton.mousePressed(()=>{
            if( song.isPlaying() ) {
                song.pause();
                playButton.html('play');
            } else {
                song.play();
                playButton.html('pause');
            }
        });

        stopButton = createButton('stop');
        stopButton.mousePressed(()=>{
            song.stop();
            playButton.html('play');
        });

        jumpButton = createButton('jump');
        jumpButton.mousePressed(()=>{

            var len = song.duration();
            //song.jump(len/2);
            var t = random(len);
            console.log(t+'/'+len);

            song.jump(t);
        });

    });

    amp = new p5.Amplitude();
}


function draw () {

    //background(random(255));

    song.setVolume( volumeSlider.value() );
    song.rate( rateSlider.value() );
    song.pan( panSlider.value() );

    //console.log( song.currentTime() );


    // 에니메이션
    // background( (song.currentTime() * 50)%255, 0, 255);

    // 트리거
    //if( song.currentTime() > 5 ) {
    //    background(255,0,255);
    //}

    // 트리거
    //song.addCue(5, ()=>{
    //    background( random(255), random(255), random(255) );
    //});

    // 트리거
    song.addCue(2, changeBackground, color( 0, 0, random(255) ) );
    song.addCue(4, changeBackground, color( 0, random(255), 0 ) );
    song.addCue(6, changeBackground, color( random(255), 0, 0 ) );

    var vol = amp.getLevel();
    var diam = map( vol, 0, 0.3, 10, 200 );

    fill(255,0,255);
    ellipse( width/2, height/2, diam, diam );
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------


function changeBackground(color) {
    background( color );
}