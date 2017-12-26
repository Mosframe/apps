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
var cols = 10;
var rows = 10;

var colors = [];


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function setup () {

    createCanvas(300, 300);

    colors = make2Darray( cols, rows );

    for( var i=0; i<cols; ++i ) {
        for( var j=0; j<rows; ++j ) {
            colors[i][j] = random(255);
        }
    }
}

function draw () {

    background(51);

    for( var i=0; i<cols; ++i ) {
        for( var j=0; j<rows; ++j ) {
            var x = i * 30;
            var y = j * 30;

            fill( colors[i][j] );
            stroke(0);
            rect(x,y,30,30);
        }
    }
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

function make2Darray ( cols, rows ) {

    var arr = new Array(cols);
    for( var i=0; i<arr.length; ++i ) {
        arr[i] = new Array(rows);
    }
    return arr;
}