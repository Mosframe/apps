/**
 * sketch.js
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 변수, 오브젝트 정의
// -----------------------------------------------------------------
var img;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    img = loadImage('../../../images/hstar.jpg');
}

function setup () {

    createCanvas(img.width,img.height);

    background(0);
}


function draw () {

    //image(img, 0, 0, img.width,img.height);
    for( var i=0; i<10; ++i ) {

        var x = random(width);
        var y = random(height);
        var c = img.get(x,y);
        fill(c,25);
        noStroke();
        ellipse(x,y,16,16);
    }

}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

