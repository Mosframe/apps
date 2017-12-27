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
var table;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    table = loadTable('data.csv', 'csv','header');
}

function setup () {

    createCanvas(600,400);
    background(0);

    // 로컬 데이터를 비주얼라이징

    /*
    var s = "64,100,32,7,87,22";
    var nums = split(s,",");
    var vals = nums.map((i)=>{ return parseInt(i,10); });

    for( var i=0; i<nums.length; ++i ){

        fill(255,127);
        stroke(255);
        ellipse(50+i*100,200, vals[i], vals[i]);
    }
    */

    // 테이블 데이터를 비주얼라이징

    var row = table.getRow(0);
    //console.log(row);

    var x = row.getNum('x');
    var y = row.getNum('y');
    var w = row.getNum('width');
    var h = row.getNum('height');

    rect(x,y,w,h);

}


function draw () {


}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

