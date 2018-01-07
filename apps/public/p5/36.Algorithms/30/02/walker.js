/**
 * walker.js
 *
 * @author : https://github.com/Mosframe
 */



// -----------------------------------------------------------------
// Walker
// -----------------------------------------------------------------
class Walker {

    // 생성자

    constructor ( x, y, stuck ) {

        this.pos = createVector( x || random(width), y || random(height) );
        this.stuck = stuck;
    }

    // 한스텝 걷기

    walk () {

        var velocity = p5.Vector.random2D();
        this.pos.add(velocity);
        this.pos.x = constrain(this.pos.x, 0, width);
        this.pos.y = constrain(this.pos.y, 0, height);
    }

    // 막다른길 검사

    checkStuck ( others ) {

        for( var i=0; i<others.length; ++i ) {
            var other = others[i];
            var d = p5.Vector.dist( this.pos, other.pos );
            if( d < r*2 ) {
                return this.stuck = true;
            }
        }
        return false;
    }

    // 드로잉

    draw () {

        stroke(255, 100);
        if( this.stuck ) {
            fill(255, 0, 100);
        } else {
            fill(255);
        }
        ellipse( this.pos.x, this.pos.y, r*2, r*2 );
    }

}