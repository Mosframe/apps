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

        this.hue = random(255);
        this.particle = new Particle( random(width), height, this.hue, true );
        this.exploded = false; // 폭발했다
        this.children = [];
    }

    // 임무 완료 체크

    isDone () {
        // 임무 : 폭발했음 + 자식이 모두 임무를 완료함
        return this.exploded && this.children.length == 0;
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
        for( var i=this.children.length-1; i>=0; --i ) {
            this.children[i].addForce( gravity );
            this.children[i].update();
            if( this.children[i].isDone() ) {
                this.children.splice(i,1);
            }
        }
    }

    // 폭발

    explode () {

        for( var i=0; i<explosionAmount; ++i ) {
            var p = new Particle( this.particle.pos.x, this.particle.pos.y, this.hue, false );
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