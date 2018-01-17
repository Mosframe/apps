/**
 * polygon.js
 *
 * p5.js    : http://p5js.org/reference
 * web      : http://developer.mozilla.org
 * @author  : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 폴리곤
// -----------------------------------------------------------------
class Polygon {

    // 생성자

    constructor (n) {

        this.vertices = [];
        this.edges = [];
        this.sides = n;
    }

    // 정점 추가

    addVertex (x,y) {

        // 정점 생성

        var a = createVector(x,y);

        // 엣지 생성, 추가

        var total = this.vertices.length;
        if(total>0) {
            var prev = this.vertices[total-1];
            var edge = new Edge(prev,a);
            this.edges.push(edge);
        }

        // 정점 추가

        this.vertices.push(a);
    }

    // 정점의 끝점과 시작점을 잇는다.

    close() {
        var total = this.vertices.length;
        var last = this.vertices[total-1];
        var first = this.vertices[0];
        var edge = new Edge(last,first);
        this.edges.push(edge);
    }

    // 모든 엣지들에 핸킨을 만든다.

    hankin () {

        // 핸킨 생성

        for( var i=0; i<this.edges.length; ++i ) {
            this.edges[i].hankin(this.sides);
        }
    }

    // 랜더링

    render () {

        // 모든 엣지들을 드로잉 한다.

        for( var i=0; i<this.edges.length; ++i ) {
            this.edges[i].render();
        }
    }
}