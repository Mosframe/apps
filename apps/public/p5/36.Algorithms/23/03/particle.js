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

    constructor ( x, y, hue, isRoot ) {

        this.pos        = createVector(x,y); // position
        this.hue        = hue;
        this.isRoot     = isRoot;
        this.lifespan   = particleLifespan; // 수명

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

    // 임무 완료 체크

    isDone () {
        return this.lifespan < 0;
    }

    // 업데이트

    update () {

        // 폭발 감속, 수명 감소

        if( !this.isRoot ) {
            this.vel.mult( 1-explosionDamping );
            --this.lifespan; // 수명 가속
        }

        this.vel.add( this.acc );
        this.pos.add( this.vel );
        this.acc.mult( 0 );
    }

    // 드로잉

    draw () {

        if( !this.isRoot ) {
            var s = random(1,particleWeight);
            var weight = map(this.lifespan,particleLifespan,0,s,1);
            strokeWeight( weight );
            var c = map(this.lifespan,0,particleLifespan,0,255);
            stroke( this.hue, c, c, c );
        } else {
            strokeWeight( particleWeight );
            stroke( this.hue, 255, 255 );
        }
        point( this.pos.x, this.pos.y );
    }


}