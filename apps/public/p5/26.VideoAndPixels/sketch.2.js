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
var video;
var snapButton;
var snapshots = [];
var go = false;
var counter = 0;
var total = 43;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function setup () {

    createCanvas(800, 240);
    background(51);
    //video = createCapture(VIDEO);
    video = createCapture(VIDEO, ready);
    video.size(320,240);
    //video.hide();
    createP('');
    //snapButton = createButton("snap");
    //snapButton.mousePressed(takeSnap);
}

function draw () {

    if( go ) {
        snapshots[counter] = video.get();
        ++counter;
        if( counter == total ) {
            counter = 0;
        }
    }

    var x = 0;
    var y = 0;
    var w = 80;
    var h = 60;

    for( var i=0; i<snapshots.length; ++i ) {
        //tint(255,50);
        var index = (i+frameCount) % snapshots.length;
        image(snapshots[index],x,y,w,h);

        x += w;
        if( x > width ) {
            x = 0;
            y += h;
        }
    }
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

function ready () {
    go = true;
}

function takeSnap () {

    //image(video,0,0);
    snapshots.push(video.get());
}