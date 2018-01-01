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

    constructor() {

        this.x = random(0,width);
        this.y = random(0,height);
        this.z = random(0,width);
    }

    update () {

    }

    show () {

        fill(255);
        noStroke();

        ellipse(this.x,this.y,8,8);
    }
}
