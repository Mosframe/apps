/**
 * leaf.js
 *
 * @author : https://github.com/Mosframe
 */

class Leaf {

    // 생성자

    constructor() {
        if( rootCenter ) {
            var r = width/2 * 1.0;
            this.pos = p5.Vector.random3D();
            this.pos.mult( random(r) );
        } else {
            //this.pos = createVector( random(width), random(height)-100 );
            var r = width/2 * 0.9;
            this.pos = p5.Vector.random3D();
            this.pos.mult( random(r) );
            this.pos.y -= 50;
        }
        this.reached= false; // 나무가지가 도착(연결)했는지 유무
    }

    // 드로잉

    draw () {
        push();
        fill(255);
        noStroke();
        translate(this.pos.x, this.pos.y, this.pos.z );
        ellipse( 0, 0, 4, 4 );
        //sphere(4);
        pop();
    }

}
