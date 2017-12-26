/**
 * sketch.js
 *
 * map 사용 테스트
 *
 * 레퍼런스: http://p5js.org/reference
 *
 * @author : https://github.com/Mosframe
 */

 var col = 0 ;

 function setup() {
   createCanvas(600,400);
}

function draw() {

  background(col);

  fill( 250, 118,222 );
  ellipse( mouseX, 200, 64, 64 );
}
