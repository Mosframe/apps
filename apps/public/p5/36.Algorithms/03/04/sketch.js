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
var tileScale = 20;
var food;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','The Snake Game : 스네이크 게임');
    createA('https://en.wikipedia.org/wiki/Snake_(video_game)','Snake_(video_game) 위키');
    createP('');
    createP('먹이 생성, 획득, 리스폰');
}

function setup () {

    createCanvas(600,600);

    frameRate(10);

    snake = new Snake();

    pickLocation();
}

function draw () {

    background(51);

    snake.update();
    snake.show();

    if( snake.eat(food) ) {
        pickLocation();
    }

    fill(255,0,100);
    rect(food.x,food.y,tileScale,tileScale);
}

function keyPressed () {

    if( keyCode === UP_ARROW ) {
        snake.dir(0,-1);
    }
    else
     if( keyCode === DOWN_ARROW ) {
        snake.dir(0, 1);
    }
    else
     if( keyCode === LEFT_ARROW ) {
        snake.dir(-1, 0);
    }
    else
     if( keyCode === RIGHT_ARROW ) {
        snake.dir(1, 0);
    }
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

// 먹이 픽업후 리스폰

function pickLocation () {

    var cols = floor(width/tileScale);
    var rows = floor(height/tileScale);

    food = createVector( floor(random(cols)), floor(random(rows)) );
    food.mult(tileScale);
}