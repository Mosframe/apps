/**
 * Flower.js
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// Flower
// -----------------------------------------------------------------

class Flower {

    constructor(x,y) {

        this.x = x;
        this.y = y;
        this.r = 30;
        this.xdir = 1;
    }

    show () {

        noStroke();
        fill(255, 0, 200, 150);
        ellipse( this.x, this.y, this.r*2, this.r*2 );
    }

    // 성장

    grow () {

        this.r += 2;
    }

    // 이동

    move () {

        this.x += this.xdir;
    }

    shiftDown () {
        this.xdir *= -1;
        this.y += this.r;
    }
}