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
    createDiv('기본 프레임워크 설정');
}

// 전역 변수들

var vals = [0,1,2,3,4,5,6,7,8,9];


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

}

// 프레임 갱신

function update () {

    // STEP 1 : X축으로 가장 큰 값을을 찾는다.

    var largestI = -1;
    for( var i=0; i<vals.length-1; ++i ) {
        if( vals[i] < vals[i+1] ) {
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
    for( var j=0; j<vals.length; ++j ) {
        if( vals[largestI] < vals[j] ) {
            largestJ = j;
        }
    }
    statuses.largestJ = largestJ;

    // STEP 3 : 가장큰 x,y값을 스왑한다.

     swap( vals, largestI, largestJ );

    // STEP 4 : 가장 큰값의 순번 다음부터 배열을 역순으로 정렬한다.

    var endArray = vals.splice( largestI+1 );
    endArray.reverse();
    vals = vals.concat( endArray );
    statuses.vals = vals;
}

// 프레임 렌더링

function render () {

    // noLoop();
    // colorMode(HSB);

    background( 0 );

    textSize(64);
    var s = '';
    for (var i = 0; i < vals.length; ++i ) {
      s += vals[i];
    }
    fill(255);
    text(s, 20, height / 2);

}

// 배열값 스왑

function swap ( a, i, j ) {

    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}
