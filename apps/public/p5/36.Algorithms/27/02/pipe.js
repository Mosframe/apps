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

        this.top    = random(height/2);
        this.bottom = random(height/2);
        this.x      = width;
        this.w      = pipeWidth;
        this.speed  = scrollSpeed; // 스크롤 속도
    }

    // 화면을 벋어났는지 검사

    isOffScreen () {
        return this.x < -this.w;
    }

    // 갱신

    update () {

        // 스크롤
        this.x -= this.speed;
    }

    // 드로잉

    draw () {
        fill(255);
        rect( this.x, 0, this.w, this.top );
        rect( this.x, height-this.bottom, this.w, this.bottom );
    }
}