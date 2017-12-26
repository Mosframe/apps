/**
 * particle.js
 *
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 파티클
// -----------------------------------------------------------------

function Particle() {

    this.pos = createVector(random(width),random(height)); // position
    this.vel = p5.Vector.random2D(); // velocity
    this.acc = createVector(0,0); // acceleration

    this.update = () => {

        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.applyForce = (force) => {

        this.acc.add(force);
    }

    this.show = () => {

        stroke(0);
        strokeWeight(4);
        point(this.pos.x, this.pos.y);
    }

    // 모서리 처리

    this.edges = () => {

        if(this.pos.x < 0       ) this.pos.x = width;
        if(this.pos.x > width   ) this.pos.x = 0;
        if(this.pos.y < 0       ) this.pos.y = height;
        if(this.pos.y > height  ) this.pos.y = 0;
    }
}