/**
 * animated-circle.js
 *
 * p5.js    : http://p5js.org/reference
 * web      : http://developer.mozilla.org
 * @author  : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 원
// -----------------------------------------------------------------
class AnimatedCircle {

    // 생성자

    constructor ( x, y, c ) {

        this.x = x;
        this.y = y;
        this.r = 1; // radius
        this.c = c;
        this.growing = true;
    }

    // 성장

    grow () {
        if( this.growing ) {
            this.r += 0.5;
        }
    }

    // 스크린 외각선 충돌

    edges () {
        return this.x + this.r > width || this.x -this.r < 0 || this.y+this.r >height || this.y-this.r < 0;
    }

    //  렌더링

    rander () {

        fill(this.c);
        noStroke();
        ellipse( this.x, this.y, this.r*2, this.r*2 );
    }
}