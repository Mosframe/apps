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
var bubbles = [];

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

}

function setup () {

    createCanvas(600,400);
    loadData();
}


function draw () {

    background(255);

    for (var i = 0; i < bubbles.length; i++) {
      bubbles[i].display();
      bubbles[i].rollover(mouseX, mouseY);
    }

    textAlign(LEFT);
    fill(0);
    text("Click to add bubbles.", 10, height-10);
}

function mousePressed () {

    var row = table.addRow();

    row.setNum('x', mouseX);
    row.setNum('y', mouseY);
    row.setNum('diameter', random(40,80));
    row.setString('name','Blah');

    if( table.getRowCount() > 10 ) {
        table.removeRow(0);
    }

    // 웹에서는 로컬에 저장된다.

    saveTable(table, 'data.csv');
    loadData();
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------


function loadData () {

    table = loadTable('data.csv', 'csv', 'header', ()=>{

        var rowCount = table.getRowCount();
        console.log(rowCount);

        for (var i = 0; i < rowCount; i++) {

            var row = table.getRow(i);
            var x = row.getNum("x");
            var y = row.getNum("y");
            var d = row.getNum("diameter");
            var n = row.getString("name");
            bubbles[i] = new Bubble(x, y, d, n);
        }
    });
}