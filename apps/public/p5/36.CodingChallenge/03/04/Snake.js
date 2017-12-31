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

    dir (x,y) {

        this.xspeed = x;
        this.yspeed = y;
    }

    update () {

        this.x += this.xspeed*tileScale;
        this.y += this.yspeed*tileScale;

        this.x = constrain( this.x, 0, width-tileScale );
        this.y = constrain( this.y, 0, height-tileScale );
    }

    show () {

        fill(255);
        rect(this.x, this.y, tileScale, tileScale );
    }

    eat (pos) {

        var d = dist(this.x, this.y, pos.x, pos.y );
        if( d < 1 ) {
            return true;
        } else {
            return false;
        }

    }
}