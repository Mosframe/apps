/**
 * blob.js
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 방울 덩어리
// -----------------------------------------------------------------
class Blob {

    // 생성자

    constructor ( x, y ) {

        this.minx = x;
        this.miny = y;
        this.maxx = x;
        this.maxy = y;
    }

    // x축 피봇 얻기

    getX () {
        return this.minxx + (this.maxx - this.minxx) * 0.5;
    }

    // y축 피봇 얻기

    getY () {
        return this.minxy + (this.maxy - this.minxy) * 0.5;
    }

    // 확장

    add ( x, y ) {

        this.minx = min( this.minx, x );
        this.miny = min( this.miny, y );
        this.maxx = max( this.maxx, x );
        this.maxy = max( this.maxy, y );
    }

    // 면적 얻기

    size () {
        return (this.maxx-this.minx) * (this.maxy-this.miny);
    }

    // 좌표와 가까운가?

    isNear ( x, y ) {

        var cx = max( min(x,this.maxx), this.minx );
        var cy = max( min(y,this.maxy), this.miny );
        var d = distSq( cx, cy, x, y );

        return d < distThreshold*distThreshold;
    }

    // 업데이트

    update () {

        this.pos.add( this.velocity );

        if( this.pos.x < 0 || this.pos.x > width ) {
            this.velocity.x = -this.velocity.x;
        }
        if( this.pos.y < 0 || this.pos.y > height ) {
            this.velocity.y = -this.velocity.y;
        }
    }

    // 드로잉

    draw () {

        fill(255);
        stroke(0);
        strokeWeight(2);
        rectMode(CORNERS);
        rect( this.minx, this.miny, this.maxx, this.maxy );
    }

}