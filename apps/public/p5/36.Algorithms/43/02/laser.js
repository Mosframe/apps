/**
 * laser.js
 *
 * p5.js    : http://p5js.org/reference
 * web      : http://developer.mozilla.org
 * @author  : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 레이저
// -----------------------------------------------------------------
class Laser {

    // 생성자

    constructor (pos,angle) {
        this.pos        = createVector(pos.x,pos.y);
        this.velocity   = p5.Vector.fromAngle(angle);
        this.velocity.mult(10);
    }

    // 총돌 체크 : 원형 칼라이더로 체크

    hits ( asteroid ) {
        var d = dist(this.pos.x,this.pos.y, asteroid.pos.x, asteroid.pos.y );
        return d < asteroid.radius;
    }

    // 화면을 벋어났는지 검사

    offscreen () {

        if( this.pos.x > width || this.pos.x < 0 ) {
            return true;
        }
        if( this.pos.y > height || this.pos.y <  0 ) {
            return true;
        }
        return false;
    }

    // 프레임 갱신

    update () {
        this.pos.add( this.velocity );
    }

    // 프레임 렌더링

    render () {

        push();
        stroke(255);
        strokeWeight(4);
        point(this.pos.x,this.pos.y);
        pop();
    }

}