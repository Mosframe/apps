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
var particles = [];

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function setup () {

    createCanvas(200, 200);

    var val = sum(1);
    console.log(val);

    val = sum(1,2);
    console.log(val);

    val = sum(1,2,3);
    console.log(val);

    var arr = [1,2,3];
    val = sum(arr);
    console.log(val);

    particles[0] = new Particle();
    particles[1] = new Particle(150,50);
    var v = createVector(150,100);
    particles[2] = new Particle(v);
    particles[3] = new Particle("100,150");

}

function draw () {

    background(51);

    for( var i=0; i<particles.length; ++i ) {
        particles[i].show();
    }
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------


function Particle (a,b) {

    if( a instanceof p5.Vector ) {

        this.x = a.x;
        this.y = a.y;

    } else if( typeof(a) === "string" ) {

        var nums = a.split(',');
        this.x = Number(nums[0]);
        this.y = Number(nums[1]);

    } else {
        this.x = a || 100;
        this.y = b || 100;
    }

    this.show = function() {
        fill(255);
        ellipse(this.x, this.y, 16, 16);
    }
}


function sum (arr) {

    if( arr instanceof Array ) {
        var val = 0;
        for( var i=0; i<arr.length; ++i ) {
            val += arr[i];
        }
        return val;
    }

    var val = 0;
    for( var i=0; i<arguments.length; ++i ) {
        val += arguments[i];
    }

    return val;
}
