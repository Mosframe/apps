/**
 * sketch.js
 *
 * 도형 그리기 테스트
 *
 * 레퍼런스: http://p5js.org/reference
 * 참고 : https://www.youtube.com/watch?v=9mucjcrhFcM&list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA&index=4
 *
 * @author : https://github.com/Mosframe
 */

 function setup() {

  // 캔버스 생성
  //createCanvas(windowWidth,windowHeight);
  createCanvas(480,270);
}

function draw() {

  // 배경색
  //background(200,200,0);
  background(150);

  // 쉐이프 피봇 설정
  ellipseMode(CENTER);
  rectMode(CENTER);

  // Body
  fill( 255, 0, 0 );
  rect( 240, 145, 20, 100 );

  // Head
  //fill( 0, 0, 255, 100 );
  fill( 0, 0, 255 );
  ellipse( 240, 115, 60, 60 );

  // Eyes
  fill( 0, 255, 0 );
  ellipse( 221, 115, 16, 32 );
  ellipse( 259, 115, 16, 32 );

  // Legs
  line( 230, 195, 220, 205 );
  line( 250, 195, 260, 205 );

}