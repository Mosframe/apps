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

  ellipse( ball.x, ball.y, 24, 24 );
}
