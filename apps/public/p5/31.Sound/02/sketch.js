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

var s;
var scl = 20;
var cols;
var rows;

var eatSound;
var startOverSound;
var hello;
var music;

var fr = 3;

var food;

var musicRate = 1;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    eatSound = loadSound('../../../sounds/Alert/Alert-06.mp3');
    startOverSound = loadSound("../../../sounds/Voice/Male/Voice-Cartoon_Laugh-01.mp3");
    hello = loadSound("../../../sounds/Voice/Male/Voice-Hello-01.mp3");
    music = loadSound("../../../sounds/Music/Music-01.mp3");
}

function setup () {

    createCanvas(300,300);

    music.setVolume(0.2);
    music.play();

    hello.playMode('sustain'); // 재생중인 사운드를 자연스럽게 정지
    //hello.playMode('restart'); //재생중인 사운드를 즉시 정지
    hello.play();

    colorMode(HSB, 255);
    noStroke();
    cols = floor(width/scl);
    rows = floor(height/scl);

    s = new Snake();
    frameRate(fr);

    pickLocation();
}


function draw () {

    background(51);

    frameRate(fr);

    // If the snake eats the food
    if (s.eat(food)) {

      eatSound.play();
      fr += 2;
      musicRate += 0.05;
      music.rate(musicRate);
      frameRate(fr);
      pickLocation();
    }

    // Check if the snake hits itself or a wall
    s.death();
    // Update snake
    s.update();
    // Draw snake
    s.show();


    fill(150, 255, 255);
    rect(food.x, food.y, scl, scl);
}

function keyPressed() {

    //if (!hello.isPlaying()) {
    //    hello.play();
    //}

    if (keyCode === UP_ARROW) {
      s.dir(0, -1);
    } else if (keyCode === DOWN_ARROW) {
      s.dir(0, 1);
    } else if (keyCode === RIGHT_ARROW) {
      s.dir(1, 0);
    } else if (keyCode === LEFT_ARROW) {
      s.dir(-1, 0);
    }

    if (key == ' ') {
      s.total++;
    }
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

// Pick a food location
function pickLocation() {
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);
}