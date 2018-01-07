/**
 * walker.js
 *
 * @author : https://github.com/Mosframe
 */



// -----------------------------------------------------------------
// Walker
// -----------------------------------------------------------------
class Walker {

    // 생성자

    constructor ( x, y, stuck ) {

        if( x && y ) {
            this.pos = createVector(x,y);
        } else {
            this.pos = this.randomPoint();
        }
        this.stuck = stuck;
    }

    // 무작위 스폰영역 얻기

    randomPoint () {

        // 스크린내부에 스폰되도록 설정

        var i = floor(random(4));
        if( i === 0 ) {
            var x = random(width);
            return createVector(x,0);
        }
        else
        if( i === 1 ) {
            var x = random(width);
            return createVector(x,height);
        }
        else
        if( i === 2 ) {
            var y = random(height);
            return createVector(0,y);
        }

        var y = random(height);
        return createVector(width,y);
    }

    // 한스텝 걷기

    walk () {

        var velocity = p5.Vector.random2D();
        this.pos.add(velocity);
        this.pos.x = constrain(this.pos.x, 0, width);
        this.pos.y = constrain(this.pos.y, 0, height);
    }

    // 막다른길 검사

    checkStuck ( others ) {

        for( var i=0; i<others.length; ++i ) {
            var other = others[i];
            // 일반적인 교차 판정
            // var d = p5.Vector.dist( this.pos, other.pos );
            // if( d < r*2 ) {
            //     return this.stuck = true;
            // }
            // 빠른 교차 판정
            var d = this.distSq( this.pos, other.pos );
            if( d < (r*r*4) ) {
                return this.stuck = true;
            }
        }
        return false;
    }

    // 드로잉

    draw () {

        stroke(255, 100);
        if( this.stuck ) {
            fill(255, 0, 100);
        } else {
            fill(255);
        }
        ellipse( this.pos.x, this.pos.y, r*2, r*2 );
    }

    // 스퀘어 디스턴스 얻기

    distSq ( a, b ) {
        var dx = b.x - a.x;
        var dy = b.y - a.y;
        return dx*dx + dy*dy;
    }
}