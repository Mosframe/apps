/**
 * main.js
 *
 * p5.js    : http://p5js.org/reference
 * web      : http://developer.mozilla.org
 * @author  : https://github.com/Mosframe
 */

// 프로젝트 설명

function discription () {

    createElement('h1','Lexicographic Order : 렉시코그래픽 오더(TPS 알고리즘)');
    createDiv('');
    createA('https://en.wikipedia.org/wiki/Lexicographical_order','Lexicographic Order wiki');
    createDiv('');
    createA('https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering','How would you explain an algorithm that generates permutations using lexicographic ordering?');
    createDiv('');
    createDiv('TPS에 렉시코그래픽 오더 적용');
}

// 전역 변수들

var cities = [];
var totalCities = 5;

var order = []

var totalPermutations;  // 총 순열 : 총연산 횟수
var calcCount = 0;      // 계산 횟수

var recordDistance;
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

    for( var i=0; i<totalCities; ++i ) {
        var v = createVector(random(width),random(height/2));
        cities[i] = v;
        order[i] = i;
    }

    recordDistance = calcDistance( cities, order );
    bestEver = order.slice(); // 복제

    totalPermutations = factorial( totalCities );
    statuses.totalPermutations = totalPermutations;
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

    // 최단경로 라인

    stroke(255, 0, 255);
    strokeWeight(4);
    noFill();
    beginShape();
    for( var i=0; i<order.length; ++i ) {
        var n = bestEver[i];
        vertex( cities[n].x, cities[n].y );
    }
    endShape();

    // 라인

    translate( 0, height/2 );

    stroke(255);
    strokeWeight(1);
    noFill();
    beginShape();
    for( var i=0; i<order.length; ++i ) {
        var n = order[i];
        vertex( cities[n].x, cities[n].y );
    }
    endShape();



    // 현재 경로가 더 가까우면 저장

    var d = calcDistance( cities, order );
    if( d < recordDistance ) {
        recordDistance = d;
        statuses.recordDistance = recordDistance;
        bestEver = order.slice(); // 복제
    }

    // 오더 넘버 드로잉

    //textSize(64);
    //var s = '';
    //for ( var i = 0; i < order.length; ++i ) {
    //  s += order[i];
    //}
    //fill(255);

    var percent = 100 * (calcCount/totalPermutations);
    text( nf(percent, 0, 2) + '% completed', 20, height/2 - 50 );

    // 다음 오더

    nextOrder();
}


// Lexical Order 알고리즘

function nextOrder () {

    ++calcCount;

    // STEP 1 : X축으로 가장 큰 값을을 찾는다.

    var largestI = -1;
    for( var i=0; i<order.length-1; ++i ) {
        if( order[i] < order[i+1] ) {
            largestI = i;
        }
    }
    statuses.largestI = largestI;
    if( largestI == -1 ) {
        noLoop();
        statuses.finished = true;
    }

    // STEP 2 : y축으로 가장 큰값을 찾는다.

    var largestJ = -1;
    for( var j=0; j<order.length; ++j ) {
        if( order[largestI] < order[j] ) {
            largestJ = j;
        }
    }
    statuses.largestJ = largestJ;

    // STEP 3 : 가장큰 x,y값을 스왑한다.

    swap( order, largestI, largestJ );

    // STEP 4 : 가장 큰값의 순번 다음부터 배열을 역순으로 정렬한다.

    var endArray = order.splice( largestI+1 );
    endArray.reverse();
    order = order.concat( endArray );
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

// 계승 : n보다 작거나 같은 모든 양의 정수의 곱를 구한다.
// n! = 1*2*3*4*5....

function  factorial ( n ) {

    if( n == 1 ) {
        return 1;
    }
    return n * factorial(n-1);
}