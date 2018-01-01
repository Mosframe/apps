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
        this.z = random(width);
    }

    update () {

        this.z -= speedSlider.value();
        if( this.z < 1 ) {
            this.x = random(-width,width);
            this.y = random(-height,height);
            this.z = width;
        }
    }

    show () {

        fill(255);
        noStroke();

        var sx = map(this.x/this.z,0,1,0,width);
        var sy = map(this.y/this.z,0,1,0,height);

        var r = map(this.z, 0, width, 16, 0);
        ellipse(sx,sy,r,r);
    }
}
