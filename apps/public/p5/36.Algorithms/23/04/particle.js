/**
 * particle.js
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 파티클
// -----------------------------------------------------------------
class Particle {

    // 생성자

    constructor ( x, y, z, hue, isSeed ) {

        this.hue        = hue;
        this.isSeed     = isSeed;
        this.lifespan   = particleLifespan; // 수명

        if( is3D ) {
            this.pos = createVector(x,y,z);
            if( this.isSeed ) {
                this.velocity = createVector(0,random(-12,-8),0);
            } else {
                this.velocity = p5.Vector.random3D();
                this.velocity.mult( random(0.1, explosionForce) );
            }
            this.accel = createVector(0,0,0);
        } else {
            this.pos = createVector(x,y);
            if( this.isSeed ) {
                this.velocity = createVector(0,random(-12,-8),0);
            } else {
                this.velocity = p5.Vector.random2D();
                this.velocity.mult( random(0.1, explosionForce) );
            }
            this.accel = createVector(0,0);
        }

    }

    // 힘을 가한다.

    addForce ( force ) {

        this.accel.add(force);
    }

    // 임무 완료 체크

    isDone () {
        return this.lifespan < 0;
    }

    // 업데이트

    update () {

        // 폭발 감속, 수명 감소

        if( !this.isSeed ) {
            this.velocity.mult( 1-explosionDamping );
            --this.lifespan; // 수명 가속
        }

        this.velocity.add( this.accel );
        this.pos.add( this.velocity );
        this.accel.mult( 0 );
    }

    // 드로잉

    draw () {

        if( is3D ) {

            noStroke();
            var weight = map(this.lifespan,particleLifespan,0,particleWeight,1);
            var c = map(this.lifespan,0,particleLifespan,0,255);
            fill( this.hue, 255, 255, c/255*0.999 );

            var vertices = this.createSphere( weight, 4 );
            this.drawSphere( vertices );

        } else {

            if( this.isSeed ) {
                strokeWeight( particleWeight );
                stroke( this.hue, 255, 255 );
            } else {
                var s = random(1,particleWeight);
                var weight = map(this.lifespan,particleLifespan,0,s,1);
                strokeWeight( weight );
                var c = map(this.lifespan,0,particleLifespan,0,255);
                stroke( this.hue, 255, 255, c );
            }

            point( this.pos.x, this.pos.y );
        }
    }

    // 구 생성

    createSphere ( r, density ) {

        var globe = [];
        for( var i=0; i<density+1; ++i ) {
            var latitude = map( i, 0, density, -HALF_PI, HALF_PI ); // 위도(y)
            globe[i] = [];
            for( var j=0; j<density+1; ++j ) {
                var longitude = map( j, 0, density, -PI, PI ); // 경도 (x)

                var x = r * cos(longitude) * cos(latitude);
                var y = r * sin(longitude) * cos(latitude);
                var z = r * sin(latitude);

                globe[i].push( createVector(x,y,z) );
            }
        }
        return globe;
    }

    // 구 드로잉

    drawSphere ( vertices ) {

        push();
        translate( this.pos.x, this.pos.y, this.pos.z );

        for( var i=0; i<vertices.length-1; ++i ) {
            beginShape(TRIANGLE_STRIP);
            for( var j=0; j<vertices[i].length; ++j ) {

                var v1 = vertices[i+0][j];
                var v2 = vertices[i+1][j];

                vertex( v1.x, v1.y, v1.z );
                vertex( v2.x, v2.y, v2.z );
            }
            endShape();
        }
        pop();

    }


}