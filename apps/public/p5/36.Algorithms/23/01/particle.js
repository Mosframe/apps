/**
 * particle.js
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 파티클
// -----------------------------------------------------------------
class Particle {

    // 생성자

    constructor ( x, y, isRoot ) {

        this.isRoot     = isRoot;
        this.lifespan   = 255; // 수명
        this.pos = createVector(x,y); // position

        if( this.isRoot ) {
            this.vel = createVector(0,random(-12,-8)); // velocity
        } else {
            this.vel = p5.Vector.random2D();
            this.vel.mult( random(0.1, explosionForce) );
        }
        this.acc = createVector(0,0); // acceleration
    }

    // 힘을 가한다.

    addForce ( force ) {

        this.acc.add(force);
    }

    // 업데이트

    update () {

        // 폭발 감속, 수명 감소

        if( !this.isRoot ) {
            this.vel.mult( explosionDamping );
            this.lifespan -= 4;
        }

        this.vel.add( this.acc );
        this.pos.add( this.vel );
        this.acc.mult( 0 );
    }

    // 드로잉

    draw () {
        if( !this.isRoot ) {
            strokeWeight( 2 );
            stroke( 255, this.lifespan );
        } else {
            strokeWeight( 4 );
            stroke( 255 );
        }
        point( this.pos.x, this.pos.y );
    }

}