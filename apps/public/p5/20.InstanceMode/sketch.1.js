/**
 * sketch.js
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



// -----------------------------------------------------------------
// sketch1
// -----------------------------------------------------------------

var sketch1 = function(p) {

    p.x = 100;
    p.y = 100;


    p.setup = function() {

        p.createCanvas(200, 200);
        p.background(51);
    }

    p.draw = function() {

        p.fill(255,0,200,25);
        p.noStroke();
        p.ellipse(p.x,p.y,48,48);

        p.x += p.random(-10,10);
        p.y += p.random(-10,10);
    }
}

// -----------------------------------------------------------------
// sketch2
// -----------------------------------------------------------------

var sketch2 = function(p) {

        p.x = 100;
        p.y = 100;

        p.setup = function() {

            p.createCanvas(200, 200);
            p.background(51);
        }

        p.draw = function() {

            p.fill(255,200,0,25);
            p.noStroke();
            p.ellipse(p.x,p.y,48,48);

            p.x += p.random(-10,10);
            p.y += p.random(-10,10);
        }
    }

var myp5_1 = new p5(sketch1);
var myp5_2 = new p5(sketch2);

setInterval(resetBackkground, 3000);


// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

function resetBackkground () {

    myp5_1.x = myp5_1.width/2;
    myp5_1.y = myp5_1.height/2;
    myp5_1.background(51);
}