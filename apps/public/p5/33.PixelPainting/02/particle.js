/**
 * particle.js
 *
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 파티클
// -----------------------------------------------------------------

function Particle() {

    this.x = width/2;
    this.y = height/2;

    var a = random(TWO_PI);
    var speed = random(1,2);

    this.vx = cos(a)*speed;
    this.vy = sin(a)*speed;


    this.update = () => {

        this.x += this.vx; //random(-10,10);
        this.y += this.vy; //random(-10,10);

        if( this.y < 0 ) this.y = height;
        if( this.y > height ) this.y = 0;

        if( this.x < 0 ) this.x = width;
        if( this.x > width ) this.x = 0;
    }

    this.display = () => {
        noStroke();
        var c = bgImage.get(this.x,this.y);
        fill(c,25);
        ellipse( this.x, this.y, 12, 12 );
    }
}
