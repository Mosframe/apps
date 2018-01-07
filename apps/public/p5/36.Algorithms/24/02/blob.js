/**
 * blob.js
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 방울 덩어리
// -----------------------------------------------------------------
class Blob {

    // 생성자

    constructor ( x, y ) {

        this.pos        = createVector(x,y);
        this.radius     = random(120,400);
        this.velocity   = p5.Vector.random2D();
        this.velocity.mult( random( 2, 5 ) );
    }

    // 업데이트

    update () {

        this.pos.add( this.velocity );

        if( this.pos.x < 0 || this.pos.x > width ) {
            this.velocity.x = -this.velocity.x;
        }
        if( this.pos.y < 0 || this.pos.y > height ) {
            this.velocity.y = -this.velocity.y;
        }
    }

    // 드로잉

    draw () {

        noFill();
        stroke(0);
        strokeWeight(4);
        ellipse( this.pos.x, this.pos.y, this.radius, this.radius );
    }

}