/**
 * Walker.js
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 무작위 이동 객체
// -----------------------------------------------------------------
function Walker () {

    this.x = width/2;
    this.y = height/2;

    this.render = () => {

        stroke(0);
        point(this.x,this.y);
    }

    this.step = () => {

        var choice = floor(random(4));
        if( choice == 0 ) {
            ++this.x;
        }
        else
        if( choice == 1 ) {
            --this.x;
        }
        else
        if( choice == 2 ) {
            ++this.y;
        }
        else
        if( choice == 3 ) {
            --this.y;
        }

        x = constrain(this.x,0,width-1);
        y = constrain(this.y,0,height-1);
    }
}