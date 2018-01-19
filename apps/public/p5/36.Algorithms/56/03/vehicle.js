/**
 * vehicle.js
 *
 * p5.js    : http://p5js.org/reference
 * web      : http://developer.mozilla.org
 * @author  : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 비히클
// -----------------------------------------------------------------
class Vehicle {

    // 생성자

    constructor (x,y) {

        this.pos        = createVector(random(width),random(height))
        this.target     = createVector(x,y);
        this.vel        = p5.Vector.random2D();
        this.acc        = createVector();
        this.r          = 8; // radius
        this.maxSpeed   = 10;
        this.maxForce   = 1;

    }

    // 행동들을 수행

    behaviors () {

        var arrive  = this.arrive(this.target);
        var mouse   = createVector(mouseX,mouseY);
        var flee    = this.flee(mouse);

        arrive.mult(1);
        flee.mult(5);

        this.addForce(arrive);
        this.addForce(flee);
    }

    // 목표점으로 이동

    arrive (target) {
        var desired = p5.Vector.sub(target, this.pos);
        var dst = desired.mag();
        var speed = this.maxSpeed;
        // 목표에 가까워지면 서서히 이동한다.
        if( dst < 100 ) {
            speed = map(dst, 0, 100, 0, this.maxSpeed);
        }
        desired.setMag(speed);
        var steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce);
        return steer;
    }

    // 목포점에 대한 반발력 발생

    flee (target) {
        var desired = p5.Vector.sub(target, this.pos);
        var dst = desired.mag();
        // 일정거리 이내에만 반반력 발생
        if( dst < 50 ) {
            desired.setMag(this.maxSpeed);
            desired.mult(-1);
            var steer = p5.Vector.sub(desired, this.vel);
            steer.limit(this.maxForce);
            return steer;
        }
        return createVector(0,0);
    }

    // 힘 가하다.

    addForce (force) {
        this.acc.add(force);
    }

    // 프레임 갱신

    update () {

        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
    }

    // 프레임 랜더링

    render () {

        stroke(255);
        strokeWeight(8);
        point(this.pos.x,this.pos.y);
    }
}