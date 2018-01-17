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
        this.vel = p5.Vector.random2D(); // velocity
        this.acc = createVector(); // acceleration
    }

    // 인력 작용

    attracted ( target ) {

        var force = p5.Vector.sub(target, this.pos); // target - this.pos
        var fSquared = force.magSq();
        fSquared = constrain(fSquared,25,500);
        var G = 50;//6.67408; // 지구의 중력가속도
        var strength = G / fSquared;
        force.setMag( strength );
        this.acc = force;
    }

    // 프레임 갱신

    update () {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
    }

    // 프레임 랜더링

    render () {

        stroke(255);
        strokeWeight(4);
        point(this.pos.x, this.pos.y);
    }

}