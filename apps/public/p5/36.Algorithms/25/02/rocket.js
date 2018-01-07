/**
 * rocket.js
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 로켓
// -----------------------------------------------------------------
class Rocket {

    // 생성자

    constructor () {

        this.pos        = createVector( width/2, height );
        this.velocity   = createVector();
        this.accel      = createVector();
        this.dna        = new DNA();
    }

    // 힘을 가함

    addForce ( force ) {

        this.accel.add(force);
    }

    // 업데이트

    update () {

        this.addForce( this.dna.genes[lifeCount] );

        this.velocity.add( this.accel );
        this.pos.add( this.velocity );
        this.accel.mult( 0 );
    }

    // 드로잉

    draw () {

        push();

        noStroke();
        fill( 255, 150 );

        translate( this.pos.x, this.pos.y );

        rotate( this.velocity.heading() ); // heading = forward
        rectMode(CENTER);
        rect( 0, 0, 20, 4 );

        pop();
   }

}