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
var snake;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','The Snake Game : 스네이크 게임');
    createA('https://en.wikipedia.org/wiki/Snake_(video_game)','Snake_(video_game) 위키');
    createP('');
    createP('기본 프레임워크 생성');
}

function setup () {

    createCanvas(600,600);

    snake = new Snake();
}

function draw () {

    background(51);

    snake.update();
    snake.show();
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------
