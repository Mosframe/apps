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
var fps;

var blob;

var blobs = [];
var zoom = 1;


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function setup () {

    fps = createP('');

    createCanvas(600, 600);
    blob = new Blob(0,0,128);
}


function draw () {

    background(0);

    translate(width/2, height/2);
    var newzoom = 128 / blob.r;
    zoom = lerp(zoom, newzoom, 0.1);
    scale(zoom);
    translate(-blob.pos.x, -blob.pos.y);


    blob.show();
    blob.update();
    blob.constrain();

    fps.html(floor(frameRate()));
}


// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

