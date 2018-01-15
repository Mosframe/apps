/**
 * main.js
 *
 * p5.js    : http://p5js.org/reference
 * web      : http://developer.mozilla.org
 * @author  : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 환경설정 변수들 설정
// -----------------------------------------------------------------

function description () {

    title       = 'A* Pathfinding Algorithm : A* 길찾기 알고리즘';
    subTitle    = '장애물 추가, 목적지가 막혔을때 처리';

    referUrls.push({
        text:'A* search algorithm',
        link:'https://en.wikipedia.org/wiki/A*_search_algorithm'
    });


    defaultCanvasWidth  = 400;
    defaultCanvasHeight = 400;
}

// -----------------------------------------------------------------
// 프로젝트 전용 변수들
// -----------------------------------------------------------------
var cols        = 25;
var rows        = 25;
var grid        = new Array(cols);
var openSet     = [];
var closedSet    = [];
var start;
var end;
var w; // 스팟 가로스케일
var h; // 스팟 세로스케일
var path = [];
var noSolution = false; // 목적지 도착하지 못했는가?

// -----------------------------------------------------------------
// 사전 작업 ( preload )
// -----------------------------------------------------------------

function awake () {

}

// -----------------------------------------------------------------
// 프레임 갱신 시작 ( setup )
// -----------------------------------------------------------------

function start () {

    // pixelDensity(1);
    // frameRate(5);
    // background(0);
    // colorMode(HSB);
    // angleMode(DEGREES);
    // removeCanvas();

    w = width / cols;
    h = height / rows;

    // 그리드 생성

    for( var i=0; i<cols; ++i ) {
        grid[i] = new Array(rows);
    }

    // 지역 초기화

    for( var i=0; i<cols; ++i ) {
        for( var j=0; j<rows; ++j ) {
            grid[i][j] = new Spot(i,j);
        }
    }

    // 인접지역들 설정

    for( var i=0; i<cols; ++i ) {
        for( var j=0; j<rows; ++j ) {
            grid[i][j].addNeighbors(grid);
        }
    }

    // 시작점과 목표점 설정

    start   = grid[0][0];
    end     = grid[cols-1][rows-1];

    start.wall = false;
    end  .wall = false;

    // 오픈셋 설정

    openSet.push(start);

 }

// -----------------------------------------------------------------
// 입력
// -----------------------------------------------------------------

function keyPressed () {

}

function  keyReleased () {

}

// -----------------------------------------------------------------
// 프레임 갱신
// -----------------------------------------------------------------

function update () {


}

// -----------------------------------------------------------------
// 프레임 렌더링
// -----------------------------------------------------------------

function render () {

    // noLoop();
    // colorMode(HSB);
    // frameRate(5);
    background( 0 );

    if( openSet.length > 0 ) {

        // F코스트가 적은 것 찾기

        var winner = 0;
        for( var i=0; i<openSet.length; ++i ) {
            if( openSet[i].f < openSet[winner].f ) {
                winner = i;
            }
        }

        // F코스트가 가장 적은 지역으로 이동

        var current = openSet[winner];

        // 목적지 도착 검사

        if( current === end ) {

            // 지나온 길을 연결하여 패스를 설정한다.

            path = [];
            var temp = current;
            path.push(temp);
            while( temp.previous ) {
                path.push(temp.previous);
                temp = temp.previous;
            }

            // 모든 계산 완료

            noLoop();
            console.log("DONE!");
        }

        // 오픈된 지역에서 현재 위치 제거

        removeFromArray( openSet, current );

        // 클로즈 지역에 현재 위치 추가

        closedSet.push(current);

        // 오픈된 인접한 지역들의 비용 계산
        // 아직 오픈되지 않은 지역은 오픈시킨다.

        var neighbors = current.neighbors;
        for( var i=0; i<neighbors.length; ++i ) {
            var neighbor = neighbors[i];

            if( !closedSet.includes(neighbor) && !neighbor.wall ) {
                var tempG = current.g + 1;
                if( openSet.includes(neighbor) ) {
                    if( tempG < neighbor.g ) {
                        neighbor.g = tempG;
                    }
                } else {
                    neighbor.g = tempG;
                    openSet.push(neighbor);
                }

                neighbor.h = heuristic( neighbor, end );
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.previous = current;
            }
        }

    } else {

        // 목적지 도달 실패

        noSolution = true;
        noLoop();
        console.log('no solution');

    }

    // 모든 지역 드로잉

    for( var i=0; i<cols; ++i ) {
        for( var j=0; j<rows; ++j ) {
            grid[i][j].render(color(255));
        }
    }

    // 오픈된 지역들 드로잉

    for( var i=0; i<closedSet.length; ++i ) {
        closedSet[i].render(color(255,0,0));
    }

    // 글로즈된 지역들 드로잉

    for( var i=0; i<openSet.length; ++i ) {
        openSet[i].render(color(0,255,0));
    }

    // 지나온 길을 연결하여 패스를 설정한다.

    if( !noSolution ) {

        path = [];
        var temp = current;
        path.push(temp);
        while( temp.previous ) {
            path.push(temp.previous);
            temp = temp.previous;
        }
    }

    // 패스 드로잉

    for( var i=0; i<path.length; ++i ) {
        path[i].render(color(0,0,255));
    }
}


// -----------------------------------------------------------------
// 프로젝트 전용 함수들
// -----------------------------------------------------------------


// 배열에서 지정된 요소를 모두 제거한다.

function removeFromArray( arr, elt ) {

    for( var i = arr.length-1; i>=0; --i ) {
        if( arr[i] == elt ) {
            arr.splice(i,1);
        }
    }
}

// 휴리스틱 비용 계산 : 목적지로부터의 비용 (거리)

function heuristic (a,b) {
    var d = abs(a.i-b.i) + abs(a.j-b.j); // 직각으로 계산
    return d;
}