/**
 * bird.js
 *
 * @author : https://github.com/Mosframe
 */



// -----------------------------------------------------------------
// 버드 : 플레이어 캐릭터
// -----------------------------------------------------------------
class Bird {

    // 생성자

    constructor () {

        this.x          = 25;
        this.y          = height/2;
        this.gravity    = 0.6;
        this.lift       =-15; // 양력
        this.velocity   = 0;

    }

    // 상승

    up () {

        this.velocity += this.lift;
    }

    // 업데이트

    update () {

        this.velocity   += this.gravity;
        this.velocity   *= 0.9; // 중력 감쇠
        this.y          += this.velocity;

        // 죽음 처리

        if( this.y > height ) {

            this.y          = height;
            this.velocity   = 0;
        }
        if( this.y < 0 ) {

            this.y          = 0;
            this.velocity   = 0;
        }
    }

    // 드로잉

    draw () {

        fill(255);
        ellipse( this.x, this.y, 32, 32 );
    }
}