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

    title       = 'Markov Chains : 마르코프 체인';
    subTitle    = '기본 프레임워크 설정';

    referUrls.push({
        text:'Markov chain',
        link:'https://en.wikipedia.org/wiki/Markov_chain'
    });
    referUrls.push({
        text:'마르코프 연쇄',
        link:'https://ko.wikipedia.org/wiki/%EB%A7%88%EB%A5%B4%EC%BD%94%ED%94%84_%EC%97%B0%EC%87%84'
    });
    referUrls.push({
        text:'Markov Chains',
        link:'http://setosa.io/ev/markov-chains/'
    });


    defaultCanvasWidth  = 400;
    defaultCanvasHeight = 400;
}

// -----------------------------------------------------------------
// 프로젝트 전용 변수들
// -----------------------------------------------------------------
var txt = "The unicorn is a legendary creature that has been described since antiquity as a beast with a large, pointed, spiraling horn projecting from its forehead. The unicorn was depicted in ancient seals of the Indus Valley Civilization and was mentioned by the ancient Greeks in accounts of natural history by various writers, including Ctesias, Strabo, Pliny the Younger, and Aelian.[1] The Bible also describes an animal, the re'em, which some translations have erroneously rendered with the word unicorn.[1] In European folklore, the unicorn is often depicted as a white horse-like or goat-like animal with a long horn and cloven hooves (sometimes a goat's beard). In the Middle Ages and Renaissance, it was commonly described as an extremely wild woodland creature, a symbol of purity and grace, which could only be captured by a virgin. In the encyclopedias its horn was said to have the power to render poisoned water potable and to heal sickness. In medieval and Renaissance times, the tusk of the narwhal was sometimes sold as unicorn horn.";
var order = 2;
var nGrams = {};

// -----------------------------------------------------------------
// 사전 작업 ( preload )
// -----------------------------------------------------------------

function awake () {

    createButton('generate').mousePressed(markovIt);
}

// -----------------------------------------------------------------
// 프레임 갱신 시작 ( setup )
// -----------------------------------------------------------------

function start () {

    // pixelDensity(1);
    //frameRate(5);
    background(0);
    //colorMode(HSB);
    // angleMode(DEGREES);
    removeCanvas();

    for( var i=0; i<txt.length-order; ++i ) {
        var gram = txt.substring(i,i+order);

        if (!nGrams[gram]) {
            nGrams[gram] = [];
        }
        nGrams[gram].push(txt.charAt(i + order));
    }
    console.log(nGrams);

 }

// -----------------------------------------------------------------
// 키 입력
// -----------------------------------------------------------------

function keyPressed () {


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
    // background( 0 );

}


// -----------------------------------------------------------------
// 프로젝트 전용 함수들
// -----------------------------------------------------------------


function markovIt () {

    var currGram = txt.substring(0,order);
    var result = currGram;
    for( var i=0; i<100; ++i ) {
        var possibilities = nGrams[currGram];
        if( !possibilities) break;
        var next = random(possibilities);
        result += next;
        var len = result.length;
        currGram = result.substring(len-order,len);
    }
    createP(result);
}