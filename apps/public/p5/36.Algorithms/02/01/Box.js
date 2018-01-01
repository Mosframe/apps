/**
 * Box.js
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// Box
// -----------------------------------------------------------------

class Box {

    constructor( x, y, z, r ) {

        this.pos = createVector(x,y,z);
        this.r = r;
    }

    show () {

        push();
        translate( this.pos.x, this.pos.y, this.pos.z );
        box(this.r);
        pop();
    }
}
