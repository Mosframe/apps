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
var cells = [];

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Mitosis Simulation : 유사분열 시뮬레이션');
    createA('https://en.wikipedia.org/wiki/Mitosis','Mitosis');
    createP('');
    createP('세포분열 구현');
    createP('');
    createP('분열:마우스로 세포 클릭');
    createP('');
}

function setup () {

    createCanvas(800,450);

    cells.push( new Cell() );
    cells.push( new Cell() );
}

function draw () {

    background(200);

    for( var i=0; i<cells.length; ++i ) {
        cells[i].move();
        cells[i].show();
    }
}


function mousePressed () {

    for( var i=cells.length-1; i>=0; --i ) {
        if( cells[i].clicked(mouseX, mouseY) ) {
            //console.log('CLICKED!');
            cells.push( cells[i].mitosis() );
            cells.push( cells[i].mitosis() );
            cells.splice(i,1);
        }
    }
}



// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------
