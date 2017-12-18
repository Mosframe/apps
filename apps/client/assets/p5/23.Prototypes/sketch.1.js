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

var p;

Particle.prototype.show = function() {
    point(this.x,this.y);
}

p5.Vector.prototype.double = function() {
    this.x *= 2;
    this.y *= 2;
    this.z *= 2;
}

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function setup () {

    createCanvas(600, 300);

    p = new Particle();

    v = createVector(3,4);

}

function draw () {

    background(51);

    p.show();
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------


function Particle () {

    this.x = 100;
    this.y = 99;

    //this.show = function() {
    //    point(this.x, this.y);
    //}
}