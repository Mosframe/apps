/**
 * asteroid.js
 *
 * p5.js    : http://p5js.org/reference
 * web      : http://developer.mozilla.org
 * @author  : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 운석
// -----------------------------------------------------------------
class Asteroid {

    // 생성자

    constructor () {

        this.pos = createVector(random(width),random(height));
        this.velocity = p5.Vector.random2D();
        this.radius = random(15,50);
        this.numVertices = floor(random(5,10));
        this.offset = [];
        for( var i=0; i<this.numVertices; ++i ) {
            this.offset.push( random(-15,15) );
        }
    }

    // 회면 이동제한

    edges () {

        if( this.pos.x > width + this.radius ) {
            this.pos.x = -this.radius;
        }
        else
        if( this.pos.x <  -this.radius ) {
            this.pos.x = width + this.radius;
        }

        if( this.pos.y > height + this.radius ) {
            this.pos.y = -this.radius;
        }
        else
        if( this.pos.y <  -this.radius ) {
            this.pos.y = height + this.radius;
        }
    }

    // 프레임 갱신

    update () {

        this.pos.add(this.velocity);
    }


    // 프레임 렌더링

    render () {

        push();
        stroke(255);
        noFill();
        translate(this.pos.x,this.pos.y);
        //ellipse(0,0,this.radius*2);
        beginShape();
        for( var i=0; i<this.numVertices; ++i ) {
            var angle = map(i,0,this.numVertices,0,TWO_PI);
            var r = this.radius+this.offset[i];
            var x = r * cos(angle);
            var y = r * sin(angle);
            vertex(x,y);
        }
        endShape(CLOSE);
        pop();
    }
}