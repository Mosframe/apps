/**
 * Drop.js
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// Drop
// -----------------------------------------------------------------

class Drop {

    constructor() {

        this.x = width/2;
        this.y = 0;
        this.ySpeed = 1;
    }

    fall () {

        this.y += this.ySpeed;
    }

    show () {

        stroke(138, 43, 226);
        line( this.x, this.y, this.x, this.y+10 );
    }
}