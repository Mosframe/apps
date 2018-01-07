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

    constructor ( x, y ) {

        if( arguments.length == 2 ) {
            this.pos = createVector(x,y);
            this.stuck = true;
        } else {
            this.pos = this.randomPoint();
            this.stuck = false;
        }
        this.r = radius;
        this.hue = hu;
    }

    // 무작위 스폰영역 얻기

    randomPoint () {

        // 아래에서 자라는 로직

        //var x = random(width);
        //return createVector(x,0);

        // 스크린 중앙에서 자라는 로직

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

        // 무작위로 이동

        var velocity = p5.Vector.random2D();

        // 빠르게 아래로 이동

        // var velocity = createVector( random(-1,1), random(-0.5,1) );

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
            if( d < (this.r*other.r*4) ) {
                //if( random(1) < 0.1 ) { // 빠른 속도를 위해 10%만 교차 시킴
                    return this.stuck = true;
                //}
            }
        }
        return false;
    }

    // 드로잉

    draw () {

        noStroke();
        //stroke(255, 100);
        //if( this.stuck ) {
        //    fill(255, 0, 100, 200);
        //} else {
        //    fill(255, 200);
        //}
        if( this.stuck ) {
            fill( this.hue, 100, 200 );
        } else {
            fill( 360, 0, 255 );
        }
        ellipse( this.pos.x, this.pos.y, this.r*2, this.r*2 );
    }

    // 스퀘어 디스턴스 얻기

    distSq ( a, b ) {
        var dx = b.x - a.x;
        var dy = b.y - a.y;
        return dx*dx + dy*dy;
    }
}