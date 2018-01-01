/**
 * Planet.js
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// Planet
// -----------------------------------------------------------------

class Planet {

    constructor( radius, distance, orbitSpeed, texture ) {

        this.radius     = radius;
        this.distance   = distance;
        this.angle      = random(TWO_PI);
        this.orbitSpeed = orbitSpeed;
        this.position   = p5.Vector.random3D();
        this.position.mult(this.distance);

        this.moons      = [];

        this.texture    = texture;
    }

    show () {

        push();

        noStroke();

        var v2 = createVector(0,0,1);
        var p = this.position.cross(v2);

        rotateX( this.angle );

        // debug line

        /*
        stroke(255,0,0);
        noFill();
        beginShape(LINES);
        vertex(0,0,0);
        vertex(this.position.x,this.position.y,this.position.z);
        endShape();

        //stroke(255);
        //beginShape(LINES);
        //vertex(0,0,0);
        //vertex(p.x,p.y,p.z);
        //endShape();

        fill(200);
        */

        // sphere


        //translate(this.distance,0);
        translate(this.position.x,this.position.y,this.position.z);
        //console.log(this.angle);

        noStroke();
        //noFill();
        //fill(255,0,0,100);
        texture(this.texture);

        //ellipse( 0, 0, this.radius*2, this.radius*2 );
        sphere(this.radius);

        for( var i=0; i<this.moons.length; ++i ) {
            this.moons[i].show();
        }



        pop();

    }

    // 달들을 스폰 스폰시킨다.

    spawnMoons ( moonNum, level ) {

        for( var i=0; i<moonNum; ++i ) {
            var radius      = this.radius/(level*1.5);
            var distance    = random( (this.radius+radius)*2, (this.radius+radius)*3 );
            var orbitSpeed  = random(-0.01,0.01);
            var texture = level <= 1 ? planetTextures[i+1] : moonTex;
            this.moons[i] = new Planet( radius, distance, orbitSpeed, texture );

            if( level < 3 ) {
                var num = floor(random(0,3));
                this.moons[i].spawnMoons( num, level+1 );
            }
        }
    }

    orbit () {

        this.angle += this.orbitSpeed;
        for( var i=0; i<this.moons.length; ++i ) {
            this.moons[i].orbit();
        }
    }
}
