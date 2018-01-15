/**
 * ship.js
 *
 * p5.js    : http://p5js.org/reference
 * web      : http://developer.mozilla.org
 * @author  : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 우주선
// -----------------------------------------------------------------
class Ship {

    // 생성자

    constructor () {

        this.pos = createVector(width/2,height/2);
        this.radius = 20;
        this.heading = 0; // front angle
        this.rotation = 0; // 회전량
        this.velocity = createVector(0,0);
        this.isBoosting = false;
    }

    // 회전량 설정

    setRotation( angle ) {
        this.rotation = angle;
    }

    // 회전

    turn () {
        this.heading += this.rotation;
    }

    // 부수터 설정

    boosting (b) {
        this.isBoosting = b;
    }

    // 회면 이동제한

    edges () {

        if( this.pos.x > width + this.radius ) {
            this.pos.x = -this.radius;
        }
        else
        if( this.pos.x <  -this.radius ) {
            this.pos.x = width + this.radius;
        }

        if( this.pos.y > height + this.radius ) {
            this.pos.y = -this.radius;
        }
        else
        if( this.pos.y <  -this.radius ) {
            this.pos.y = height + this.radius;
        }
    }

    // 운석과 총돌 검사

    hits ( asteroid ) {
        var d = dist( this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y );
        return d < this.radius + asteroid.radius;
    }

    // 프레임 갱신

    update () {
        if( this.isBoosting ) {
            this.boost();
        }
        this.pos.add(this.velocity);
        this.velocity.mult(0.99); // 감속
    }

    // 프레임 렌더링

    render () {

        push();
        translate(this.pos.x, this.pos.y);
        rotate( this.heading + PI/2 );
        fill(0);
        stroke(255);
        triangle(-this.radius, this.radius, this.radius, this.radius, 0, -this.radius );
        pop();

    }

    // 부스터 갱신

    boost () {
        var force = p5.Vector.fromAngle(this.heading);
        force.mult(0.1); // 감속
        this.velocity.add(force);
    }

}