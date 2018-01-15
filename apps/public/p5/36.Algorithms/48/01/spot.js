/**
 * spot.js
 *
 * p5.js    : http://p5js.org/reference
 * web      : http://developer.mozilla.org
 * @author  : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 지역
// -----------------------------------------------------------------
class Spot {

    // 생성자

    constructor ( i, j ) {

        this.i = i;
        this.j = j;

        this.g = 0; // G코스트 : 시작위치로부터의 비용
        this.h = 0; // H코스트(Heuristic Cost) : 목적지로부터의 비용
        this.f = 0; // F코스트 : G코스트 + H코스트

        this.neighbors = []; //인접한 지역들
        this.previous = undefined; // 현재 지역으로 이동하기 이전 지역
    }

    // 인접한 지역들 추가 : 내위치에서 4방향

    addNeighbors (grid) {

        if( this.i < cols-1) {
            this.neighbors.push(grid[this.i+1][this.j+0]);
        }
        if( this.i > 0 ) {
            this.neighbors.push(grid[this.i-1][this.j+0]);
        }
        if( this.j < rows-1 ) {
            this.neighbors.push(grid[this.i+0][this.j+1]);
        }
        if( this.j > 0 ) {
            this.neighbors.push(grid[this.i+0][this.j-1]);
        }
    }

    // 랜더링

    render (c) {

        fill(c);
        stroke(0);
        rect(this.i*w,this.j*h,w-1,h-1);
    }
}