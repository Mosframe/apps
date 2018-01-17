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
    }

    // 랜더링

    render () {

        stroke(255,0,255);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    }

}