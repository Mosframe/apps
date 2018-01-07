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

    constructor ( dna ) {

        this.pos        = createVector( width/2, height );
        this.velocity   = createVector();
        this.accel      = createVector();
        if( dna ) {
            this.dna    = dna;
        } else {
            this.dna    = new DNA();
        }
        this.fitness    = 0; // 합목적성(fitness) : 목표물에 도달하기 위한 척도, 목표물에 도달할수록 값이 커진다.
        this.completed  = false;
    }

    // 힘을 가함

    addForce ( force ) {

        this.accel.add(force);
    }

    // 피트니스 계산

    calcFitness () {

        // 목표물과의 거리의 반비례 계산
        var d = dist( this.pos.x, this.pos.y, target.x, target.y );
        this.fitness = map( d, 0, width, width, 0 );
        if( this.completed ) {
            this.fitness *= 10; // 10배 확률 증가
        }
    }

    // 업데이트

    update () {

        var d = dist( this.pos.x, this.pos.y, target.x, target.y );
        if( d < 10 ) {
            this.completed = true;
            this.pos = target.copy();
        }

        this.addForce( this.dna.genes[lifeCount] );

        if( !this.completed ) {

            this.velocity.add( this.accel );
            this.pos.add( this.velocity );
            this.accel.mult( 0 );
        }
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