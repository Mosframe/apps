/**
 * blob.js
 *
 * @author : https://github.com/Mosframe
 */



// -----------------------------------------------------------------
// 블랍
// -----------------------------------------------------------------
class Blob {

    // 생성자

    constructor ( x, y, radius ) {

        this.pos    = createVector( x, y );
        this.radius = radius;
    }

    // 업데이트

    update () {

        var velocity = createVector( mouseX, mouseY );
        velocity.sub( this.pos );
        velocity.setMag(3);
        this.pos.add( velocity );
    }

    // 드로잉

    draw () {

        fill(255);
        ellipse( this.pos.x, this.pos.y, this.radius, this.radius );
    }
}