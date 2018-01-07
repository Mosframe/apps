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

        // 화면 범위내에서 이동제한

        //var velocity = createVector( mouseX, mouseY );
        //velocity.sub( this.pos );

        // 이동제한 없음

        var velocity = createVector( mouseX-width/2, mouseY-height/2 );

        velocity.setMag(3);
        this.pos.add( velocity );
    }

    // 드로잉

    draw () {

        fill(255);
        ellipse( this.pos.x, this.pos.y, this.radius, this.radius );
    }
}