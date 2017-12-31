/**
 * Snake.js
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// Snake
// -----------------------------------------------------------------

class Snake {

    constructor() {

        this.x = 0;
        this.y = 0;
        this.xspeed = 1;
        this.yspeed = 0;
    }

    update () {

        this.x += this.xspeed;
        this.y += this.yspeed;
    }

    show () {

        fill(255);
        rect(this.x, this.y, 10, 10 );
    }
}