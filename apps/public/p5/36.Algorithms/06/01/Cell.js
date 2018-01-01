/**
 * Cell.js
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// Cell
// -----------------------------------------------------------------

class Cell {

    constructor() {

        this.pos    = createVector(random(width),random(height));
        this.radius = 100;
        this.color  = color(random(100,255), 0, random(100,255));
    }

    show () {

        noStroke();
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.radius*2, this.radius*2);
    }

    move () {

        var velocity = p5.Vector.random2D();
        this.pos.add(velocity);
    }
}
