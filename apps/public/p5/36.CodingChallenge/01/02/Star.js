/**
 * Star.js
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// Star
// -----------------------------------------------------------------

class Star {

    constructor () {

        this.x = random(-width,width);
        this.y = random(-height,height);
        this.z = width;
    }

    update () {

        --this.z;
    }

    show () {

        fill(255);
        noStroke();

        var sx = map(this.x/this.z,0,1,0,width);
        var sy = map(this.y/this.z,0,1,0,height);

        ellipse(sx,sy,8,8);
    }
}
