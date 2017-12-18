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
var images = [];

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

// 설정

function setup () {

    noCanvas();

    //createP("[테스트 방법]");
    //createP("...");

    for( var i=0; i<5; ++i ) {

        var p = createP('This is a like: ');
        p.style('background-color', '#CCC');
        p.style('padding', '24px');

        var a = createA('#', 'apples');
        a.mousePressed(addPhoto);
        a.parent(p);
    }

    var button = select('#clear');
    button.mousePressed(clearStuff);

}

// 디스플레이

function draw () {
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------


function addPhoto () {

    var img = createImg('apple.png');
    images.push(img);
    img.size(100,100);
    var paragraph = this.parent();
    img.parent(paragraph); //paragraph.child(img);
}

function clearStuff () {

    for( var i=0; i<images.length; ++i ) {
        images[i].remove();
        //images[i].hide();
    }
    images = [];
}