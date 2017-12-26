/**
 * sketch.java
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 변수, 오브젝트 정의
// -----------------------------------------------------------------


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

void setup () {

    size(640,360);
    background(51);

    for( int i=0; i<5000; ++i ) {
        float x = random(width);
        float y = random(height);
        float r = random(100,255);
        float b = random(100,255);
        noStroke();
        fill(r,0,b, 100);
        ellipse(x,y,16,16);
    }

    save("output.png"); // 캔버스 파일로 저장
    exit();
}