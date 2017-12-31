/**
 * Ship.js
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// Ship
// -----------------------------------------------------------------

class Ship {

    constructor() {

        this.x = width/2;
    }


    show () {

        fill(255);
        rectMode(CENTER);
        rect( this.x, height-30, 20, 60 );
    }

    move ( dir ) {

        this.x += dir * 5;
    }
}