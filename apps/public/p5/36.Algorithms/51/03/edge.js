/**
 * edge.js
 *
 * p5.js    : http://p5js.org/reference
 * web      : http://developer.mozilla.org
 * @author  : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 면
// -----------------------------------------------------------------
class Edge {

    // 생성자

    constructor (a,b) {
        this.a = a;
        this.b = b;
        this.h1;
        this.h2;
    }

    // 핸킨을 만든다.

    hankin (sides) {

        // 두 정점의 중간점

        var mid = p5.Vector.add( this.a, this.b );
        mid.mult(0.5);

        // 두방향 벡터

        var v1 = p5.Vector.sub(this.a, mid);
        var v2 = p5.Vector.sub(this.b, mid);

        var elen = v1.mag() + delta; // 엣지의 길이

        var offset1 = mid;
        var offset2 = mid;

        if( delta > 0 ) {
            v1.setMag(delta);
            v2.setMag(delta);
            offset1 = p5.Vector.add(mid, v2);
            offset2 = p5.Vector.add(mid, v1);
        }

        v1.normalize();
        v2.normalize();

        v1.rotate(radians(-angle));
        v2.rotate(radians( angle));

        // 싸인법칙 적용

        var interior = (sides-2) * PI / sides;
        var alpha = interior * 0.5;
        var beta = PI - radians(angle) - alpha;
        var hlen = (elen * sin(alpha)) / sin(beta); //핸킨의 길이

        v1.setMag(hlen);
        v2.setMag(hlen);

        // 핸킨

        this.h1 = new Hankin(offset1,v1);
        this.h2 = new Hankin(offset2,v2);
    }


    // 랜더링

    render () {
        stroke(255,50);

        // 엣지 라인

        //line(this.a.x, this.a.y, this.b.x, this.b.y);

        // 핸킨

        this.h1.render();
        this.h2.render();
    }
}