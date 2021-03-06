/**
 * sketch.js
 *
 * 거품 그리기
 *
 * 레퍼런스: http://p5js.org/reference
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 변수, 오브젝트 정의
// -----------------------------------------------------------------
var nums = [100, 25, 46, 72];

var num = 23;

// -----------------------------------------------------------------
// p5함수들
// -----------------------------------------------------------------

// 설정

function setup () {

    createCanvas(600,400);

}

// 디스플레이

function draw () {

    background(0);

    for( var i=0; i<nums.length; ++i ) {

        stroke(255);
        fill(51);
        ellipse( 100 + (i*100),200, nums[i], nums[i]);
    }
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------


