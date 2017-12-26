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

function Particle(x,y) {

    this.x = x;
    this.y = y;
    this.r = random(4,32);

    this.update = () => {
        this.x += random(-10,10);
        this.y += random(-10,10);

        this.x = constrain( this.x, 0, width);
        this.y = constrain( this.y, 0, height);
    }

    this.show = () => {
        noStroke();
        var px = floor(this.x / vScale);
        var py = floor(this.y / vScale);
        var col = video.get(px, py);
        //console.log(col);
        fill(col[0],col[1],col[2], alphaSlider.value());
        ellipse(this.x, this.y, this.r, this.r);
    }
}
