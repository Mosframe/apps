/**
 * sketch.js
 *
 * Mouse 이벤트 테스트
 *
 * 레퍼런스: http://p5js.org/reference
 *
 * @author : https://github.com/Mosframe
 */

 var r        = 218 ;
 var g        = 160 ;
 var b        = 221 ;

 var circle = {
   x        : 0   ,
   y        : 200 ,
   diameter : 50  ,
 };

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
  ellipse( circle.x, circle.y, circle.diameter, circle.diameter );

  // 이동
  circle.x = circle.x + 1;
}
