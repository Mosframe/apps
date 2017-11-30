/**
 * sketch.js
 *
 * FlickerArray
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
  strokeWeight(4);
  stroke(255);

  ellipse( 0  , 200, 25, 25 );
  ellipse( 50 , 200, 25, 25 );
  ellipse( 100, 200, 25, 25 );
  ellipse( 150, 200, 25, 25 );
  ellipse( 200, 200, 25, 25 );
  ellipse( 250, 200, 25, 25 );
}
