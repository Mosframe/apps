/**
 * leaf.js
 *
 * @author : https://github.com/Mosframe
 */

class Leaf {

    // 생성자

    constructor() {

        this.pos    = createVector( random(width), random(height-100) );
        this.reached= false; // 나무가지가 도착(연결)했는지 유무
    }

    // 드로잉

    draw () {

        fill(255);
        noStroke();
        ellipse( this.pos.x, this.pos.y, 4, 4 );
    }

}
