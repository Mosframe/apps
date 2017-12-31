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

    constructor(x,y) {

        this.x = x;
        this.y = y;
    }

    show () {

        noStroke();
        fill(50, 0, 200);
        rect( this.x, this.y, 16, 16 );
    }

    move () {

        this.y -= 5;
    }
}