/**
 * sketch.js
 *
 * 상하 좌우로 바운스되는 공
 *
 * 레퍼런스: http://p5js.org/reference
 *
 * @author : https://github.com/Mosframe
 */

 var ball = {
   x      : 300 ,
   y      : 200 ,
   xSpeed : 4   ,
   ySpeed :-3   ,
 }

function setup () {

   createCanvas(600,400);
}

function draw () {

  background(0);

  // 공 이동
  move();

  // 공 바운스
  bounce();

  // 공 드로잉
  display();
}

// 공 이동
function move () {

  ball.x += ball.xSpeed;
  ball.y += ball.ySpeed;
}

// 공 바운스

function bounce () {

  if( ball.x > width || ball.x < 0 ) {
    ball.xSpeed = -ball.xSpeed;
  }
  if( ball.y > height || ball.y < 0 ) {
    ball.ySpeed = -ball.ySpeed;
  }
}

// 공 드로잉

function display () {

  stroke(255);
  strokeWeight(4);
  //noFill();
  fill(255,0,200);

  ellipse( ball.x, ball.y, 24, 24 );
}