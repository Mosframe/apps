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

    title       = 'AFINN-111 Sentiment Analysis: AFINN(정수로 평가된 영어 단어 목록)를 이용한 감정 분석';
    subTitle    = '문장을 입력 받아서 입력한 사람의 감정을 숫자로 표현한다.';

    referUrls.push({
        text:'AFINN',
        link:'http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010'
    });


    defaultCanvasWidth  = 400;
    defaultCanvasHeight = 400;
}

// -----------------------------------------------------------------
// 프로젝트 전용 변수들
// -----------------------------------------------------------------
var afinn;
var txt;

// -----------------------------------------------------------------
// 사전 작업 ( preload )
// -----------------------------------------------------------------

function awake () {

    afinn = loadJSON('AFINN-111.json');

    createP(`
    Type here:<br/>
    <textarea id="txt" cols=50 rows=10></textarea>
    <p id="score"></p>
    <p id="comparative"></p>
    <p id="wordlist"></p>
    `);
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
    v.statusVisible = false;

    console.log(afinn);

    txt = select('#txt');
    txt.input(typing);
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


function typing () {

    var textinput = txt.value();
    var words = textinput.split(/\W/);
    console.log(words);
    var socredwords = [];
    var totalScore = 0;

    for( var i=0; i<words.length; ++i ) {
        var word = words[i].toLowerCase();
        if( afinn.hasOwnProperty(word) ) {
            var score = afinn[word];
            console.log(word, score);
            totalScore += Number(score);
            socredwords.push( word + ': ' + score + ' ' );
        }
    }

    var scoreP = select('#score');
    scoreP.html('score: ' + totalScore );

    var comp = select('#comparative');
    comp.html('comparative: ' + totalScore / words.length );

    var wordlist = select('#wordlist');
    wordlist.html(socredwords);

}