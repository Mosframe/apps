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
var cellScale = 10;
var cols;
var rows;
var grid = [];
var currCell;
var scaleSlider;
var widthSlider;
var heightSlider;
var mazeCanvas;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Maze Generator : 미로 생성기');
    createP('미로 스케일 설정');
    createP('https://en.wikipedia.org/wiki/Maze_generation_algorithm');
    createP('');

    createSpan('scale:');
    scaleSlider = createSlider(10,40,10,1).changed( ()=>{
        createGrid();
    });
    createSpan('width:');
    widthSlider = createSlider(100,1000,400,10).changed( ()=>{
        createGrid();
    });
    createSpan('height:');
    heightSlider = createSlider(100,1000,400,10).changed( ()=>{
        createGrid();
    });


    createP('');

}

function setup () {

    createGrid();
}

function draw () {

    background(51);

    for( var cell of grid ) {
        cell.show();
    }

    currCell.visited = true;
    currCell.highlight();

    // step 1

    var nextCell = currCell.searchNextCell();
    if( nextCell ) {
        nextCell.visited = true;

        // step 3

        removeWalls( currCell, nextCell );


        // step 4

        currCell = nextCell;
    }
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------


function createGrid () {

    grid = [];

    cellScale = scaleSlider.value();
    var width = widthSlider.value();
    var height = heightSlider.value();

    if( !mazeCanvas ) {
        mazeCanvas = createCanvas(width,height);
    } else {
        resizeCanvas(width,height);
    }


    var fps = map(cellScale,scaleSlider.elt.min,scaleSlider.elt.max,30,5);
    frameRate(fps);

    cols = floor(width/cellScale);
    rows = floor(height/cellScale);

    for( var y=0; y < rows; ++y ) {
        for( var x=0; x < cols; ++x ) {
            var cell = new Cell(x,y);
            grid.push(cell);
        }
    }

    currCell = grid[0];
}

// 그리드 인덱스 얻기

function index ( x, y ) {
    if( x < 0 || y < 0 || x > cols-1 || y > rows-1 ) return -1;
    return x + y * cols;
}

// 벽들 삭제

function removeWalls( a, b ) {

    var x = a.x - b.x;
    if( x === 1 ) {
        a.walls[3] = false;
        b.walls[1] = false;
    }
    else
    if( x === -1 ) {
        a.walls[1] = false;
        b.walls[3] = false;
    }

    var y = a.y - b.y;
    if( y === 1 ) {
        a.walls[0] = false;
        b.walls[2] = false;
    }
    else
    if( y === -1 ) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
}