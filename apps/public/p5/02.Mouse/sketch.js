/**
 * sketch.js
 *
 * Mouse 이벤트 테스트
 *
 * 레퍼런스: http://p5js.org/reference
 *
 * @author : https://github.com/Mosframe
 */

 function setup() {

  // 캔버스 생성
  //createCanvas(windowWidth,windowHeight);
  createCanvas(600,400);
  // 배경색
  background(250,250,100);
}

function draw() {

  // ellipse
  noStroke();
  fill( 250, 200, 200, 50 );
  ellipse( mouseX, mouseY, 25, 25 );
}

function mousePressed() {

  // 배경색
  background(250,250,100);
}