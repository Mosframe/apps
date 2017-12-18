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



// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

// 설정

function setup () {

    noCanvas();

    createP("[테스트 방법]");
    createP("element들을 클릭한다.");

    for( var i=0; i<10; ++i ) {
        //var p = createP('apples');
        var p = createA('#','apples');
        var x = floor(random(windowWidth));
        var y = floor(random(150,windowHeight));
        p.position(x,y);
        p.class('apple');
    }

    for( var i=0; i<10; ++i ) {
        //var p = createA('http://google.com','blueberries');
        var p = createA('#','blueberries');
        var x = floor(random(windowWidth));
        var y = floor(random(150,windowHeight));
        p.position(x,y);
        p.class('blueberry');
        p.mousePressed(becomeApple);
    }

}

// 디스플레이

function draw () {
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------


function becomeApple () {

    //this.removeClass('blueberry');
    this.class('apple');
}