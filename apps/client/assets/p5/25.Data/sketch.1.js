/**
 * sketch.js
 *
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 변수, 오브젝트 정의
// -----------------------------------------------------------------
var flower;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    flower = loadJSON("flower.json");
}

function setup () {

    createCanvas(400, 400);

}

function draw () {

    background(0);

    fill(flower.r,flower.g,flower.b);
    text(flower.name, 10, 50);
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------