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

        this.x = random(width);
        this.y = random(-500, -50);
        this.ySpeed = random(4, 10);
        this.len = random(10,20);
    }

    fall () {

        this.y += this.ySpeed;
        this.ySpeed += 0.2;

        if( this.y > height ) {
            this.y = random(-200,-100);
            this.ySpeed = random(4, 10);
        }
    }

    show () {

        stroke(138, 43, 226);
        line( this.x, this.y, this.x, this.y+this.len );
    }
}