/**
 * branch.js
 *
 * @author : https://github.com/Mosframe
 */

class Branch {

    // 생성자

    constructor( parent ) {

        this.childCount = 0; // 생성할 자식수 ( 자식들을 생성하기 위한 임시변수 )
        this.len        = 2;
        this.parent     = parent;

        if( this.parent == null ) {
            this.pos    = createVector( width/2, height );
            this.dir    = createVector( 0, -1 );
        } else {
            this.dir    = p5.Vector.mult( this.parent.dir, this.len );
            this.pos    = p5.Vector.add( this.parent.pos, this.parent.dir );
        }
        this.originalDir = this.dir.copy();
    }

    // 리셋

    reset () {
        this.dir        = this.originalDir;
        this.childCount = 0;
    }

    // 드로잉

    draw () {
        if( this.parent != null ) {
            stroke( 255 );
            line( this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y );
        }
    }


}
