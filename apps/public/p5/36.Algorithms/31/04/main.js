/**
 * main.js
 *
 * p5.js    : http://p5js.org/reference
 * web      : http://developer.mozilla.org
 * @author  : https://github.com/Mosframe
 */

// 프로젝트 설명

function discription () {

    createElement('h1','Traveling Salesperson with Genetic Algorithm : 유전자 알고리즘(TPS)');
    createDiv('');
    createA('https://en.wikipedia.org/wiki/Travelling_salesman_problem','Travelling salesman problem wiki');
    createDiv('');
    createDiv('TPS에 유전자 알고리즘 적용');
}

// 전역 변수들

var totalCities = 10;
var cities = [];

var popSize     = 300;
var population  = []; // 오더리스트들을 가짐
var fitness     = []; // 포인트들간의 거리값을 전체거리의 비율로 가지고 있는다.

var recordDistance = Infinity;
var bestEver;


// 사전 작업 설정

function awake () {

}

// 프로세스 시작 설정

function start () {

    // pixelDensity(1);
    //frameRate(5);
    background(0);
    //colorMode(HSB);
    // angleMode(DEGREES);

    var order = [];
    for( var i=0; i<totalCities; ++i ) {
        var v = createVector(random(width),random(height/2));
        cities[i] = v;
        order[i] = i;
    }

    for( var i=0; i<popSize; ++i ) {
        population[i] = shuffle(order); // 무작위로 배열을 섞는다.
    }
    //console.log(population);
}

// 프레임 갱신

function update () {

}

// 프레임 렌더링
function render () {

    // noLoop();
    // colorMode(HSB);
    background( 0 );

    // GA
    calculateFitness();
    normalizeFitness();
    nextGeneration();


    // 최단 경로 드로잉

    stroke(255);
    strokeWeight(4);
    noFill();
    beginShape();
    for( var i=0; i<bestEver.length; ++i ) {
        var n = bestEver[i];
        vertex( cities[n].x, cities[n].y );
        ellipse( cities[n].x, cities[n].y, 16, 16 );
    }
    endShape();
}


// 배열값 스왑

function swap ( a, i, j ) {

    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}

// 포인트들의 전체 거리 계산

function calcDistance( points, order ) {

    var sum = 0;
    for( var i=0; i<order.length-1; ++i ) {
        var cityAIndex = order[i+0];
        var cityA = points[cityAIndex];
        var cityBIndex = order[i+1];
        var cityB = points[cityBIndex];

        var d = dist(cityA.x,cityA.y,cityB.x,cityB.y);
        sum += d;
    }
    return sum;
}
