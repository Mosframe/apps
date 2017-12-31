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

    constructor(pos, radius, _color) {

        if( pos ) {
            this.pos = pos.copy();
        } else {
            this.pos = createVector(random(width),random(height));
        }
        this.radius = radius    || 100;
        this.color  = _color    || color(random(100,255), 0, random(100,255), 100);
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

    clicked (x,y) {

        return dist(this.pos.x,this.pos.y,x,y) < this.radius;
    }

    // 분열

    mitosis () {

        //this.pos.x += random(-this.radius, this.radius);
        return new Cell(this.pos, this.radius*0.8, this.color);
    }
}
