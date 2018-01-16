/**
 * spot.js
 *
 * p5.js    : http://p5js.org/reference
 * web      : http://developer.mozilla.org
 * @author  : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 지역 (타일)
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

        this.wall = false;

        if( random(1) < 0.3 ) {
            this.wall = true;
        }
    }

    // 인접한 지역들 추가 : 내위치에서 8방향

    addNeighbors (grid) {

        var i = this.i;
        var j = this.j;

        // 수직,수평 4방향

        if( i < cols-1) {
            this.neighbors.push(grid[i+1][j+0]);
        }
        if( i > 0 ) {
            this.neighbors.push(grid[i-1][j+0]);
        }
        if( j < rows-1 ) {
            this.neighbors.push(grid[i+0][j+1]);
        }
        if( j > 0 ) {
            this.neighbors.push(grid[i+0][j-1]);
        }

        // 사선 4방향

        if( i > 0 && j > 0 ) {
            this.neighbors.push(grid[i-1][j-1]);
        }
        if( i < cols-1 && j > 0 ) {
            this.neighbors.push(grid[i+1][j-1]);
        }
        if( i > 0 && j < rows-1 ) {
            this.neighbors.push(grid[i-1][j+1]);
        }
        if( i < cols-1 && j < rows-1 ) {
            this.neighbors.push(grid[i+1][j+1]);
        }
    }

    // 랜더링

    render (c) {

        //fill(c);
        noFill();
        strokeWeight(1);
        stroke(0);
        rect(this.i*w,this.j*h,w-1,h-1);

        // 벽 드로잉

        if( this.wall ) {

            // 원형 벽

            fill(0);
            noStroke();
            ellipse(this.i*w+w/2,this.j*h+h/2,w*0.8,h*0.8);

            // 박스형 벽

            // stroke(0);
            // rect(this.i*w,this.j*h,w-1,h-1);
        }
    }
}