/**
 * Snake.js
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// Snake
// -----------------------------------------------------------------

class Snake {

    constructor() {

        this.x = 0;
        this.y = 0;
        this.xspeed = 1;
        this.yspeed = 0;
        this.tailCounter = 0;
        this.tail = [];
    }

    dir (x,y) {

        this.xspeed = x;
        this.yspeed = y;
    }

    update () {

        if( this.tailCounter === this.tail.length ) {

            // 꼬리 이동 (쉬프트)
            for( var i=0; i<this.tail.length-1; ++i ) {

                this.tail[i] = this.tail[i+1];
            }
        }
        this.tail[this.tailCounter-1] = createVector(this.x,this.y);

        // 머리 이동
        this.x += this.xspeed*tileScale;
        this.y += this.yspeed*tileScale;

        this.x = constrain( this.x, 0, width-tileScale );
        this.y = constrain( this.y, 0, height-tileScale );

    }

    show () {

        fill(255);

        // 꼬리 드로잉
        for( var i=0; i<this.tail.length; ++i ) {

            rect( this.tail[i].x, this.tail[i].y, tileScale, tileScale );
        }

        // 헤드 드로잉
        rect(this.x, this.y, tileScale, tileScale );
    }

    eat (pos) {

        var d = dist(this.x, this.y, pos.x, pos.y );
        if( d < 1 ) {
            ++this.tailCounter;
            return true;
        } else {
            return false;
        }

    }
}