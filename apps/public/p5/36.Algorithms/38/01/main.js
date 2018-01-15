/**
 * main.js
 *
 * p5.js    : http://p5js.org/reference
 * web      : http://developer.mozilla.org
 * @author  : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 환경설정 변수들 설정
// -----------------------------------------------------------------

function description () {

    title       = 'Clappy Bird! : 칼라피 버드 게임';
    subTitle    = '기본 프레임워크 설정';

    referUrls.push({
        text:'Flappy Bird',
        link:'../../27/03'
    });


    defaultCanvasWidth  = 400;
    defaultCanvasHeight = 600;
}

// -----------------------------------------------------------------
// 프로젝트 전용 변수들
// -----------------------------------------------------------------
var bird;
var pipes = [];
var mic;
var clapping = false;

var scrollSpeed     = 2; // 배경 스크롤 속도
var pipeWidth       = 50; // 파이프 넓이
var pipeSpawnFreq   = 80; // 파이프 스폰 주기

var minJumpVolumeSlider;
var maxJumpVolumeSlider;

// -----------------------------------------------------------------
// 사전 작업 ( preload )
// -----------------------------------------------------------------

function awake () {

    createSpan('minJumpVolume:').parent(canvasElement);
    minJumpVolumeSlider = createSlider( 0, 0.3, 0.1, 0.01 ).touchMoved(()=>{
        v.minJumpVolume = minJumpVolumeSlider.value();
    }).parent(canvasElement);
    createSpan('maxJumpVolume:').parent(canvasElement);
    maxJumpVolumeSlider = createSlider( 0, 0.3, 0.3, 0.01 ).touchMoved(()=>{
        v.maxJumpVolume = maxJumpVolumeSlider.value();
    }).parent(canvasElement);
}

// -----------------------------------------------------------------
// 프레임 갱신 시작 ( setup )
// -----------------------------------------------------------------

function start () {

    // pixelDensity(1);
    //frameRate(5);
    background(0);
    //colorMode(HSB);
    // angleMode(DEGREES);
    //removeCanvas();

    mic = new p5.AudioIn();
    mic.start();

    bird = new Bird();
    pipes.push( new Pipe() );

    v.minJumpVolume = minJumpVolumeSlider.value();
    v.maxJumpVolume = maxJumpVolumeSlider.value();
 }

// -----------------------------------------------------------------
// 키 입력
// -----------------------------------------------------------------

function keyPressed () {

    if( key == ' ' ) {
        bird.up();
    }
}

// -----------------------------------------------------------------
// 프레임 갱신
// -----------------------------------------------------------------

function update () {


}

// -----------------------------------------------------------------
// 프레임 렌더링
// -----------------------------------------------------------------

function render () {

    // noLoop();
    // colorMode(HSB);
    background( 0 );

    // 파이프들

    for( var i=pipes.length-1; i>=0; --i ) {
        var pipe = pipes[i];

        pipe.update();
        pipe.draw();

        // 충돌 체크

        if( pipe.hits(bird) ) {

        }

        if( pipes[i].isOffScreen() ) {
            pipes.splice( i,1 );
        }
    }

    // 버드

    bird.update();
    bird.draw();

    // 파이프 스폰

    if( frameCount % 80 == 0 ) {

        pipes.push( new Pipe() );
    }


    // 마이크 볼륨 얻기

    v.micVolume = mic.getLevel() * 10;

    // 점프

    if( v.micVolume > v.maxJumpVolume && !clapping ) {
        bird.up();
        clapping = true;
    }

    if( v.micVolume < v.minJumpVolume ) {
        clapping = false;
    }


    // 마이크 볼륨 드로잉

    noStroke();
    fill(0, 255, 0);
    var y = map(v.micVolume, 0, 1, height, 0 );
    rect( width-50, y, 50, height-y );

    // 점프에 필요한 볼륨게이지 표시

    var by = map( v.minJumpVolume, 0, 1, height, 0 );
    stroke(0,0,255);
    strokeWeight(4);
    line( width-50, by, width, by );

    var ty = map( v.maxJumpVolume, 0, 1, height, 0 );
    stroke(255,0,0);
    strokeWeight(4);
    line( width-50, ty, width, ty );
}


// -----------------------------------------------------------------
// 프로젝트 전용 함수들
// -----------------------------------------------------------------
