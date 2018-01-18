/**
 * particle.js
 *
 * p5.js    : http://p5js.org/reference
 * web      : http://developer.mozilla.org
 * @author  : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 파티클
// -----------------------------------------------------------------
class Particle {

    // 생성자

    constructor (x,y) {
        this.pos = createVector(x,y);
        this.prev = createVector(x,y);
        this.vel = createVector(); // velocity
        //this.vel = p5.Vector.random2D(); // velocity
        //this.vel.setMag(random(2,5));
        this.acc = createVector(); // acceleration
    }

    // 인력/반발력 작용

    attracted ( target ) {

        var force = p5.Vector.sub(target, this.pos); // target - this.pos
        var d = force.mag();
        d = constrain(d,1,25);
        var G = 50;//6.67408; // 지구의 중력가속도
        var strength = G / (d*d);
        force.setMag( strength );

        // 가까우면 반발력 적용
        if(d<20) {
            force.mult(-10);
        }

        this.acc.add( force );
    }

    // 프레임 갱신

    update () {
        this.vel.add(this.acc);
        this.vel.limit(5);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    // 프레임 랜더링

    render () {

        stroke(255);
        strokeWeight(4);
        //point(this.pos.x, this.pos.y);
        line( this.pos.x, this.pos.y, this.prev.x, this.prev.y );

        this.prev.x = this.pos.x;
        this.prev.y = this.pos.y;
    }

}