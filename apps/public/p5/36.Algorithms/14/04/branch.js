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
            if( rootCenter ) {
                this.pos = createVector( 0, 0 );
                this.dir = createVector( 0, random(-1,1)>0?1:-1 );
            } else {
                this.pos = createVector( 0, height/2 );
                this.dir = createVector( 0, -1 );
            }
        } else {
            this.dir = p5.Vector.mult( this.parent.dir, this.len );
            this.pos = p5.Vector.add( this.parent.pos, this.parent.dir );
        }
        this.originalDir = this.dir.copy();
    }

    // 리셋

    reset () {
        this.dir        = this.originalDir;
        this.childCount = 0;
    }

    // 드로잉

    draw ( weight ) {
        if( this.parent == null ) return;

        push();
        strokeWeight(weight);
        stroke( 255 );
        //line( this.pos.x, this.pos.y, this.pos.z, this.parent.pos.x, this.parent.pos.y, this.parent.pos.z );
        beginShape(LINES);
        vertex( this.pos.x, this.pos.y, this.pos.z );
        vertex( this.parent.pos.x, this.parent.pos.y, this.parent.pos.z );
        endShape( );
        pop();
    }


}
