/**
 * Cell.js
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// Cell
// -----------------------------------------------------------------

class Cell {

    // 생성자

    constructor( x, y ) {

        this.x = x;
        this.y = y;

        // top, right, bottom, left
        this.walls = [true,true,true,true];

        this.visited = false;
    }

    // 드로잉

    show () {

        var x = this.x * cellScale;
        var y = this.y * cellScale;

        // edge

        stroke(255);

        // top
        if( this.walls[0] ) {
            line( x+0 , y+0 , x+cellScale , y+0 );
        }
        // right
        if( this.walls[1] ) {
            line( x+cellScale , y+0 , x+cellScale , y+cellScale );
        }
        // bottom
        if( this.walls[2] ) {
            line( x+cellScale , y+cellScale , x+0 , y+cellScale );
        }
        // left
        if( this.walls[3] ) {
            line( x+0 , y+cellScale , x+0 , y+0 );
        }

        // deubuging : visited check

        if( this.visited ) {
            noStroke();
            fill(255, 0, 255, 100);
            rect( x, y, cellScale, cellScale );
        }
    }

    // 주변 셀들 중에 이동 가능한 셀을 찾아서 반환한다.

    searchNextCell () {

        // 주변에 방문하지 않은 셀들 찾기

        var neighbors = [];

        var top     = grid[ index( this.x+0 , this.y-1 ) ];
        var right   = grid[ index( this.x+1 , this.y+0 ) ];
        var bottom  = grid[ index( this.x+0 , this.y+1 ) ];
        var left    = grid[ index( this.x-1 , this.y+0 ) ];

        if( top && !top.visited ) {
            neighbors.push(top);
        }
        if( right && !right.visited ) {
            neighbors.push(right);
        }
        if( bottom && !bottom.visited ) {
            neighbors.push(bottom);
        }
        if( left && !left.visited ) {
            neighbors.push(left);
        }

        if( neighbors.length > 0 ) {
            var n = floor(random(0, neighbors.length));
            return neighbors[n];
        } else {
            return undefined;
        }
    }

    // 하일라이트 표시

    highlight () {

        var x = this.x * cellScale;
        var y = this.y * cellScale;
        noStroke();
        fill( 0, 0, 255, 100 );
        rect( x, y, cellScale, cellScale );
    }

}
