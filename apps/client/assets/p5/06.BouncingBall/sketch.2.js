/**
 * sketch.js
 *
 * 좌우로 바운스되는 공
 *
 * 레퍼런스: http://p5js.org/reference
 *
 * @author : https://github.com/Mosframe
 */

var x = 0;

function setup () {

   createCanvas(600,400);
}

function draw () {

  background(0);

  stroke(255);
  strokeWeight(4);
  noFill();

  ellipse( x, 200, 100, 100 );

  if( x > width ) {
    // print("스크린을 벋어남!");
    x = x -3;
  }
  x = x + 3;

}
