/**
 * sketch.js
 *
 * Mouse 이벤트 테스트
 *
 * 레퍼런스: http://p5js.org/reference
 *
 * @author : https://github.com/Mosframe
 */

 var x        = 0   ;
 var y        = 200 ;
 var diameter = 50  ; // 원의 지름
 var r        = 218 ;
 var g        = 160 ;
 var b        = 221 ;

 function setup() {

  // 캔버스 생성
  createCanvas(600,400);
}

function draw() {

  // 배경색
  background(r,g,b);

  // ellipse
  noStroke();
  fill( 250, 200, 200 );
  ellipse( x, y, diameter, diameter );

  // 이동
  x = x + 1;
}
