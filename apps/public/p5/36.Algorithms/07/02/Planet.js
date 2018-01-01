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

    constructor( radius, distance, orbitSpeed ) {

        this.radius     = radius;
        this.distance   = distance;
        this.angle      = random(TWO_PI);
        this.orbitSpeed = orbitSpeed;
        this.planets    = [];
    }

    show () {

        fill(255, 100);

        push();

        rotate(this.angle);
        translate(this.distance,0);
        //console.log(this.angle);

        ellipse( 0, 0, this.radius*2, this.radius*2 );

        for( var i=0; i<this.planets.length; ++i ) {
            this.planets[i].show();
        }

        pop();

    }

    // 달을 스폰 스폰시킨다.

    spawnMoons ( moonNum ) {

        for( var i=0; i<moonNum; ++i ) {
            var radius      = this.radius*0.5;
            var distance    = random(75,300);
            var orbitSpeed  = random(0.02,0.1);
            this.planets[i] = new Planet( radius, distance, orbitSpeed );
        }
    }

    orbit () {

        this.angle += this.orbitSpeed;
        for( var i=0; i<this.planets.length; ++i ) {
            this.planets[i].orbit();
        }
    }
}