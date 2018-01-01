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
var w = 40;
var cols;
var rows;
var grid = [];
var currCell;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Maze Generator : 미로 생성기');
    createP('기본 프레임워크 구현');
    createP('https://en.wikipedia.org/wiki/Maze_generation_algorithm');
    createP('');
}

function setup () {

    createCanvas(800,450);
    frameRate(5);

    cols = floor(width/w);
    rows = floor(height/w);

    for( var y=0; y < rows; ++y ) {
        for( var x=0; x < cols; ++x ) {
            var cell = new Cell(x,y);
            grid.push(cell);
        }
    }

    currCell = grid[0];
}

function draw () {

    background(51);

    for( var cell of grid ) {
        cell.show();
    }

    currCell.visited = true;
    var nextCell = currCell.searchNextCell();
    if( nextCell ) {
        nextCell.visited = true;
        currCell = nextCell;
    }
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------


// 그리드 인덱스 얻기

function index ( x, y ) {
    if( x < 0 || y < 0 || x > cols-1 || y > rows-1 ) return -1;
    return x + y * cols;
}