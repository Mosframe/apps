/**
 * branch.js
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */

class Branch {

    // 생성자

    constructor( begin, end ) {

        this.begin      = begin;
        this.end        = end;
        this.finished   = false;
    }

    // 드로잉

    draw () {

        stroke( 255 );
        line( this.begin.x, this.begin.y, this.end.x, this.end.y );
    }

    // 하위 가지 생성 (우측방향)

    branchA () {

        var dir = p5.Vector.sub( this.end, this.begin );
        dir.rotate(angle);
        dir.mult(branchScale);
        var newEnd = p5.Vector.add( this.end, dir );

        return new Branch( this.end, newEnd );
    }

    // 하위 가지 생성 (좌측방향)

    branchB () {

        var dir = p5.Vector.sub( this.end, this.begin );
        dir.rotate(-angle);
        dir.mult(branchScale);
        var newEnd = p5.Vector.add( this.end, dir );

        return new Branch( this.end, newEnd );
    }

    // 흔들림 발생

    jitter () {
        this.end.x += random(-1,1);
        this.end.y += random(-1,1);
    }
}
