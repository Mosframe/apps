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

    // 업데이트

    this.update = () => {

        var newvel = createVector(mouseX-width/2, mouseY-height/2);
        newvel.div(50);
        newvel.limit(3);
        this.vel.lerp(newvel,0.2);
        this.pos.add(this.vel);
    }


    // 드로잉

    this.show = () => {

        //fill(255);
        //ellipse( this.pos.x, this.pos.y, this.r * 2, this.r * 2 );

        push();
        translate(this.pos.x,  this.pos.y);
        beginShape();
        for( var a=0; a < TWO_PI; a += 0.1 ) {
            var offset = map(sin(a*5 + frameCount*0.01), -1, 1, -25, 25);
            var r = this.r + offset;
            var x = r * cos(a);
            var y = r * sin(a);
            //ellipse(x,y,4,4);
            vertex(x,y);
        }
        endShape();
        pop();
    }
}