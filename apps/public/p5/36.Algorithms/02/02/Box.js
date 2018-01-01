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

    generate () {

        var boxes = []
        for( var x=-1; x<2; ++x ) {
            for( var y=-1; y<2; ++y ) {
                for( var z=-1; z<2; ++z ) {

                    var newR = this.r / 3;
                    var b = new Box( this.pos.x+x*newR, this.pos.y+y*newR, this.pos.z+z*newR, newR );
                    boxes.push(b);
                }
            }
        }
        return boxes;
    }

    show () {

        push();
        translate( this.pos.x, this.pos.y, this.pos.z );
        box(this.r);
        pop();
    }
}
