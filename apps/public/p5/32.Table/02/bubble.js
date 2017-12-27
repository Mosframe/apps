/**
 * bubble.js
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// Bubble
// -----------------------------------------------------------------
function Bubble( x, y, diameter, name ) {

    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.name = name;
    this.over = false;

    this.rollover = function( px ,py ) {

        var d = dist(px,py,this.x,this.y);
        if(d<this.diameter/2) {
            this.over = true;
        } else {
            this.over = false;
        }
    }

    this.display = function() {

        stroke(0);
        strokeWeight(2);
        noFill();
        ellipse(this.x,this.y,this.diameter,this.diameter);
        if(this.over) {
            fill(0);
            textAlign(CENTER);
            text(this.name,this.x,this.y+this.diameter/2+20);
        }
    }
}