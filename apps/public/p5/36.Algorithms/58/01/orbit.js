/**
 * orbit.js
 *
 * p5.js    : http://p5js.org/reference
 * web      : http://developer.mozilla.org
 * @author  : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 궤도
// -----------------------------------------------------------------

class Orbit {

    // 생성자

    constructor (x,y,r,n,parent) {

        this.x = x;
        this.y = y;
        this.r = r; // radius
        this.n = n;
        this.parent = parent;
        this.speed = radians(pow(k,n-1)) / resolution; // 회전속도
        this.child = undefined;
        this.angle = PI/2; // 위에서부터 시작
    }

    // 자식 오빗 추가

    addChild( child ) {

        var newR = this.r / 3;
        var newX = this.x + this.r + newR;
        var newY = this.y;
        this.child = new Orbit(newX,newY,newR,this.n+1,this);
        return this.child;
    }

    // 프레임 갱신

    update () {

        if( this.parent ) {
            this.angle += this.speed;
            var rsum = this.r - this.parent.r; // 인사이드 드로잉
            //var rsum = this.r + this.parent.r; // 아웃사이드 드로잉
            this.x = this.parent.x + rsum * cos(this.angle);
            this.y = this.parent.y + rsum * sin(this.angle);

        }
    }

    // 프레임 렌더링

    render () {

        stroke(255,100);
        strokeWeight(1);
        noFill();
        ellipse(this.x,this.y,this.r*2,this.r*2);

    }

}
