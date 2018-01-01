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
        this.z = random(0,20);
        this.len = map(this.z,0,20, 10, 20);
        this.ySpeed = map(this.z,0,20,1,20);
    }

    fall () {

        this.y += this.ySpeed;

        var gravity = map(this.z, 0 ,20, 0, 0.2);
        this.ySpeed += gravity;

        if( this.y > height ) {
            this.y = random(-200,-100);
            //this.z = random(0,20);
            //this.len = map(this.z,0,20, 10, 20);
            this.ySpeed = map(this.z,0,20,4,10);
        }
    }

    show () {

        var thick = map(this.z,0,20,1,3);
        strokeWeight( thick );
        stroke(138, 43, 226);
        line( this.x, this.y, this.x, this.y+this.len );
    }
}