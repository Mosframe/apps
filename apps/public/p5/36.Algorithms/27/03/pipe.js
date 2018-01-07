/**
 * pipe.js
 *
 * @author : https://github.com/Mosframe
 */



// -----------------------------------------------------------------
// 파이프
// -----------------------------------------------------------------
class Pipe {

    // 생성자

    constructor () {

        this.top        = random(height/2);
        this.bottom     = random(height/2);
        this.x          = width;
        this.width      = pipeWidth;
        this.speed      = scrollSpeed; // 스크롤 속도
        this.hightlight = false;
    }

    // 화면을 벋어났는지 검사

    isOffScreen () {
        return this.x < -this.width;
    }

    // 충돌 검사

    hits ( bird ) {

        if( bird.y < this.top || bird.y > height - this.bottom ) {
            if( bird.x > this.x && bird.x < this.x+this.width ) {
                this.hightlight = true;
                return true;
            }
        }
        this.hightlight = false;
        return false;
    }

    // 갱신

    update () {

        // 스크롤
        this.x -= this.speed;
    }

    // 드로잉

    draw () {
        fill(255);
        if( this.hightlight ) {
            fill( 255, 0, 0 );
        }
        rect( this.x, 0, this.width, this.top );
        rect( this.x, height-this.bottom, this.width, this.bottom );
    }
}