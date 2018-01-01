/**
 * spring.js
 *
 * @author : https://github.com/Mosframe
 */

class Spring extends VerletSpring2D {

    // 생성자

    constructor ( a, b ) {
        super( a, b, w, 0.5 );

    }

    // 드로잉

    draw () {

        stroke(255);
        strokeWeight(2);
        line( this.a.x, this.a.y, this.b.x, this.b.y );
    }
}