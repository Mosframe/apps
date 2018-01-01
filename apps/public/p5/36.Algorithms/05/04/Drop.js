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
        this.r = 8;
        this.toDelete = false;
    }

    show () {

        noStroke();
        fill(50, 0, 200);
        rect( this.x, this.y, this.r*2, this.r*2 );
    }

    move () {

        this.y -= 5;
    }

    // 충돌 체크

    hits (flower) {

        //if( this.toDelete ) return false;

        var d = dist( this.x, this.y, flower.x, flower.y );
        return d < this.r + flower.r;
    }

    // 증발하다

    evaporate () {

        this.toDelete = true;
    }

}