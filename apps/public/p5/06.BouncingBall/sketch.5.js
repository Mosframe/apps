/**
 * sketch.js
 *
 * 좌우로 바운스되는 공
 *
 * 레퍼런스: http://p5js.org/reference
 *
 * @author : https://github.com/Mosframe
 */


function setup () {

   createCanvas(600,400);
}

function draw () {

  background(0);

  stroke(255);
  strokeWeight(4);
  noFill();

  if( mouseX > 250 ) {

    ellipse( 300, 200, 100, 100 );
  }
  else
  if( mouseX > 150 ) {

    rect( 300, 200, 100, 100 );
  }
  else
  if( mouseX > 50 ) {

    line( 0, 0, width, height );
  } else {

    point (300, 200 );
  }

}
