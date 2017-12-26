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
// 변수, 오브젝트 정의
// -----------------------------------------------------------------
var scl;
var w;
var h;
var cols;
var rows;
var zoff   = 0.0;
var z      = [];


// -----------------------------------------------------------------
// Landscape
// -----------------------------------------------------------------

function Landscape(scl_,w_,h_) {

    scl    = scl_;
    w      = w_;
    h      = h_;
    cols   = w/scl;
    rows   = h/scl;
    zoff   = 0.0;

    for( var i=0; i<cols; ++i ) {
        z[i]=[];
    }

    this.calculate = () => {

        var xoff =  0;
        for( var i=0; i<cols-1; ++i ) {

            var yoff = zoff;
            for(  var j=0; j<rows; ++j ) {

                z[i][j] = map(noise(xoff, yoff), 0, 1, -120, 120);
                yoff += 0.1;
            }
            xoff += 0.1;
        }
        zoff -= 0.1;
    }

    this.rander = () => {

        stroke(0);
        fill(100, 100);

        for( var y=0; y<rows-1; ++y ) {
            beginShape(TRIANGLE_STRIP);
            for( var x=0; x<cols; ++x ) {
                push();
                vertex(x*scl-w/2 , y*scl    -h/2 , z[x][y+0]);
                vertex(x*scl-w/2 , y*scl+scl-h/2 , z[x][y+1]);
                pop();
            }
            endShape();
        }
    }
}