/**
 * sketch.js
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */

/*

이 시뮬레이터는 매회 10장의 티켓을 구입할 수 있고, 50,000명이 추첨에 참여 합니다.
그러므로 5,000번 이상 참여해야 1번 정도 당첨될 수 있습니다.
또한 당신이 99% 확률로 당첨이 되려면 최대 약 23,000회 까지 참여 해야 합니다.

99%확률로 1회이상 당첨되기 위해 필요한 참여횟수(N)?
0.01=(4999/5000)^N
N = log(0.01) / log(4999/5000) = 23023.5482681
0.01 =(4999/5000)^23023
약 23,000번 참여해야 99%확율로 당첨될 수 있다.

*/

// -----------------------------------------------------------------
// 변수, 오브젝트 정의
// -----------------------------------------------------------------
var button;
var results;
var started = false;
var entrants;
var buyTicket = 10;
var prob;
var total = 0;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function setup () {

    noCanvas();

    entrants = select('#entrants');
    entrants.input(updateProbability);

    select('#buyTicket').html(buyTicket);

    button = select('#startButton');
    results = select('#results');
    button.mousePressed(startLottery);

    noLoop();
}


function draw () {

    if( started ) {

        var r = floor(random(prob));

        if( r == 1) {
            //console.log('당첨');
            results.html('당첨');
            noLoop();
        } else {
            //console.log('실패');
            results.html('실패');
        }

        ++total;
        select('#total').html(total);
    }
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

function startLottery () {

    started = true;
    total = 0;
    loop();
}

function updateProbability () {

    prob = entrants.html() / buyTicket;
    select('#chance').html(prob);

    var notwinning  = (prob-1)/prob;
    var win99Num    = log(0.01)/log(notwinning);
    select('#win99Num').html( floor(win99Num) );
}