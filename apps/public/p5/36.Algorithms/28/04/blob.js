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

        this.pos        = createVector( x, y );
        this.radius     = radius;
        this.velocity   = createVector( 0, 0 );
    }

    // 다른 블랍을 먹었는지 체크하고 성장한다.

    eats ( other ) {

        var d = p5.Vector.dist( this.pos, other.pos );
        if( d < this.radius + other.radius ) {

            // 먹이의 면적만큼 흡수한다.

            var sum = PI * this.radius * this.radius + PI * other.radius * other.radius;
            this.radius = sqrt(sum/PI);

            // 반지름 만큼 성장 ( 빠른 성장 테스트시만 사용 )

            //this.radius += other.radius;

            return true;
        }
        return false;
    }

    // 이동 범위 제한

    constrain () {

        this.pos.x = constrain( this.pos.x, -width, width );
        this.pos.y = constrain( this.pos.y, -height, height );
    }

    // 업데이트

    update () {

        // 화면 범위내에서 이동제한

        // var newVelocity = createVector( mouseX, mouseY );
        // newVelocity.sub( this.pos );
        // newVelocity.setMag(3);

        // 이동제한 없음

        var newVelocity = createVector( mouseX-width/2, mouseY-height/2 );
        newVelocity.setMag(3);

        // 자연스런 속도 변화

        this.velocity.lerp( newVelocity, 0.2 );

        // 이동

        this.pos.add( this.velocity );
    }

    // 드로잉

    draw () {

        fill(255);
        ellipse( this.pos.x, this.pos.y, this.radius*2, this.radius*2 );
    }
}