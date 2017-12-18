/**
 * particle.js
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 전역변수들
// -----------------------------------------------------------------
var grivity = 0.1;

// -----------------------------------------------------------------
// 파티클
// -----------------------------------------------------------------
function Particle( x, y ) {

    this.x = x;
    this.y = y;

    this.yspeed = 0;
    this.history = [];

    this.update = function() {

        this.x += random(-10,10);
        this.y += random(-10,10);

        var v = createVector( this.x, this.y );
        this.history.push(v);

        if( this.history.length > 100 ) {
            this.history.splice(0, 1);
        }
    }

    this.show = function() {

        stroke(0);
        fill(0,150);
        ellipse(this.x,this.y,24,24);

        noFill();
        beginShape();
        for( var i=0; i<this.history.length; ++i ) {
            var pos = this.history[i];
            //fill(random(255));
            //ellipse(pos.x, pos.y, i, i);
            vertex(pos.x,pos.y);
        }
        endShape();

    }
}