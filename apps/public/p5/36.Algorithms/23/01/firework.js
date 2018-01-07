/**
 * firework.js
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 불꽃
// -----------------------------------------------------------------
class Firework {

    // 생성자

    constructor ( x, y ) {

        this.particle = new Particle( random(width), height, true );
        this.exploded = false; // 폭발했다
        this.children = [];
    }

    // 업데이트

    update () {

        // 메인 파티클

        if( !this.exploded ) {

            this.particle.addForce( gravity );
            this.particle.update();

            // 최고 높이 감지

            if( this.particle.vel.y >= 0 ) {
                this.exploded = true;
                this.explode();
            }
        }

        // 자식 파티클 갱신
        for( var i=0; i<this.children.length; ++i ) {
            this.children[i].addForce( gravity );
            this.children[i].update();
        }
    }

    // 폭발

    explode () {

        for( var i=0; i<100; ++i ) {
            var p = new Particle( this.particle.pos.x, this.particle.pos.y, false );
            this.children.push(p);
        }

    }

    // 드로잉

    draw () {

        if( !this.exploded ) {
            this.particle.draw();
        }

        for( var i=0; i<this.children.length; ++i ) {
            this.children[i].draw();
        }
    }

}