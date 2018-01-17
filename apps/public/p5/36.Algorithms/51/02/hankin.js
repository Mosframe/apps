/**
 * hankin.js
 *
 * p5.js    : http://p5js.org/reference
 * web      : http://developer.mozilla.org
 * @author  : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 핸킨
// -----------------------------------------------------------------
class Hankin {

    // 생성자

    constructor (a,v) {
        this.a = a;
        this.v = v;
        this.b = p5.Vector.add(a,v);
        this.end;
        this.prevD;
    }

    // 종단점 찾기 : 다른 핸킨과 만나는 지점

    findEnd (other) {

        // 두 라인 교차점 찾기

        var den = (other.v.y * this.v.x) - (other.v.x * this.v.y);
        if( !den ) return;

        var numa = (other.v.x * (this.a.y - other.a.y)) - (other.v.y * (this.a.x - other.a.x));
        var numb = (this.v.x * (this.a.y - other.a.y)) - (this.v.y * (this.a.x - other.a.x));
        var ua = numa / den;
        var ub = numb / den;
        var x = this.a.x + (ua * this.v.x);
        var y = this.a.y + (ua * this.v.y);

        if (ua > 0 && ub > 0) {
            var candidate = createVector(x, y);
            var d1 = p5.Vector.dist(candidate, this.a);
            var d2 = p5.Vector.dist(candidate, other.a);
            var d = d1 + d2;
            var diff = abs(d1 - d2);
            if (diff < 0.001) {
                if( !this.end ) {
                    this.prevD = d;
                    this.end = candidate;
                }
                else
                if( d < this.prevD ) {
                    this.prevD = d;
                    this.end = candidate;
                }
            }
        }
    }

    // 랜더링

    render () {

        stroke(255,0,255);
        line(this.a.x, this.a.y, this.end.x, this.end.y);

        /*
        fill(255);
        ellipse(this.a.x,this.a.y,8);

        if( this.end ) {
            fill(255,255,0);
            ellipse(this.end.x,this.end.y,8);
        }
        */
    }

}