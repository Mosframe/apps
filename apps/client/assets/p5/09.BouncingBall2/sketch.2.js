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
  stroke(255);
  strokeWeight(4);
  noFill();

  // 공 드로잉
  ellipse( ball.x, ball.y, 24, 24 );

  // 공 바운스
  if( ball.x > width || ball.x < 0 ) {
    ball.xSpeed = -ball.xSpeed;
  }
  if( ball.y > height || ball.y < 0 ) {
    ball.ySpeed = -ball.ySpeed;
  }

  // 공 이동
  ball.x += ball.xSpeed;
  ball.y += ball.ySpeed;
}
