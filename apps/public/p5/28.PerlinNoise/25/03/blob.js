/**
 * landscape.js
 *
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// Blob
// -----------------------------------------------------------------

function Blob(x,y,r) {

    this.pos = createVector(x,y);
    this.r = r;
    this.vel = createVector(0,0);

    this.yoff = 0;

    // 업데이트

    this.update = () => {

        var newvel = createVector(mouseX-width/2, mouseY-height/2);
        newvel.div(50);
        newvel.limit(3);
        this.vel.lerp(newvel,0.2);
        this.pos.add(this.vel);
    }

    // 다른 블랍 흡수

    this.eats = (other) => {

        var d = p5.Vector.dist(this.pos, other.pos);
        if( d<this.r + other.r) {
           var sum = PI * this.r * this.r + PI * other.r * other.r;
           this.r = sqrt(sum/PI);
           //this.r += other.r;
           return true;
        } else {
            return false;
        }
    }

    // 범위 제한

    this.constrain = () => {

        blob.pos.x = constrain(blob.pos.x, -width/4, width/4);
        blob.pos.y = constrain(blob.pos.y, -height/4, height/4);
    }

    // 드로잉

    this.show = () => {

        //fill(255);
        //ellipse( this.pos.x, this.pos.y, this.r * 2, this.r * 2 );

        push();
        translate(this.pos.x,  this.pos.y);
        beginShape();
        var xoff = 0;
        for( var a=0; a < TWO_PI; a += 0.1 ) {
            var offset = map(noise(xoff,this.yoff), 0, 1, -25, 25); // 고정
            //var offset = map(noise(xoff+this.yoff), 0, 1, -25, 25); // 스핀닝
            var r = this.r + offset;
            var x = r * cos(a);
            var y = r * sin(a);
            //ellipse(x,y,4,4);
            vertex(x,y);
            xoff += 0.1;
        }
        endShape();
        pop();

        this.yoff += 0.01;
    }
}