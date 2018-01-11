/**
 * main.js
 *
 * p5.js    : http://p5js.org/reference
 * web      : http://developer.mozilla.org
 * @author  : https://github.com/Mosframe
 */

// 프로젝트 설명

function discription () {

    createElement('h1','Traveling Salesperson problem(TSP) : 외판원 문제');
    createDiv('');
    createA('https://en.wikipedia.org/wiki/Travelling_salesman_problem','Travelling salesman problem wiki');
    createDiv('');
    createDiv('기본 프레임워크 설정');
}

// 전역 변수들

var cities = [];
var totalCities = 10;
var recordDistance;
var bestEver;


// 사전 작업 설정

function awake () {

}

// 프로세스 시작 설정

function start () {

    // pixelDensity(1);
    // frameRate(5);
    background(0);
    //colorMode(HSB);
    // angleMode(DEGREES);

    for( var i=0; i<totalCities; ++i ) {
        var v = createVector(random(width),random(height));
        cities[i] = v;
    }

    recordDistance = calcDistance( cities );
    bestEver = cities.slice(); // 복제
}

// 프레임 갱신

function update () {

}

// 프레임 렌더링

function render () {

    // noLoop();
    // colorMode(HSB);
    background( 0 );

    // 웨이포인트

    fill(255);
    for( var i=0; i<cities.length; ++i ) {
        ellipse( cities[i].x, cities[i].y, 4, 4 );
    }

    // 라인

    stroke(255);
    strokeWeight(1);
    noFill();
    beginShape();
    for( var i=0; i<cities.length; ++i ) {
        vertex( cities[i].x, cities[i].y );
    }
    endShape();


    // 최단경로 라인

    stroke(255, 0, 255);
    strokeWeight(4);
    noFill();
    beginShape();
    for( var i=0; i<bestEver.length; ++i ) {
        vertex( bestEver[i].x, bestEver[i].y );
    }
    endShape();

    // 무작위 경로 설정

    var i = floor(random(cities.length));
    var j = floor(random(cities.length));
    swap( cities, i, j );

    // 현재 경로가 더 가까우면 저장

    var d = calcDistance( cities );
    if( d < recordDistance ) {
        recordDistance = d;
        statuses.recordDistance = recordDistance;
        bestEver = cities.slice(); // 복제
    }

}

// 배열값 스왑

function swap ( a, i, j ) {

    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}

// 포인트들의 전체 거리 계산

function calcDistance( points ) {

    var sum = 0;
    for( var i=0; i<points.length-1; ++i ) {
        var d = dist(points[i].x,points[i].y,points[i+1].x,points[i+1].y);
        sum += d;
    }
    return sum;
}