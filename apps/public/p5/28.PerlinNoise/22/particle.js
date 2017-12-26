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
    this.vel = createVector(0,0); // velocity
    this.acc = createVector(0,0); // acceleration
    this.maxspeed = 4;

    this.follow = (vectors) => {

        var x = floor(this.pos.x/scl);
        var y = floor(this.pos.y/scl);
        var index = x + y * cols;
        var force = vectors[index];
        this.applyForce(force);
    }

    this.update = () => {

        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);

        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.applyForce = (force) => {

        this.acc.add(force);
    }

    this.show = () => {

        stroke(0,5);
        strokeWeight(1);
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