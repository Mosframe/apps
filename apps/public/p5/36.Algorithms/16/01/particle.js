/**
 * particle.js
 *
 * @author : https://github.com/Mosframe
 */

class Particle extends VerletParticle2D {

    // 생성자

    constructor ( x, y ) {
        super(x,y);

    }

    // 드로잉

    draw () {

        fill(255);
        ellipse(this.x,this.y,10,10);
    }
}