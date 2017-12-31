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
        this.xdir = 0;
    }


    show () {

        fill(255);
        rectMode(CENTER);
        rect( this.x, height-30, 20, 60 );
    }

    // 이동 처리

    move () {

        this.x += this.xdir * 5;
    }

    // 이동 방향 설정

    setDir ( dir ) {

        this.xdir = dir;
    }
}