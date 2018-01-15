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
    subTitle    = 'tsv파일을 Json파일로 변환';

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
var table;
var afinn = {};

// -----------------------------------------------------------------
// 사전 작업 ( preload )
// -----------------------------------------------------------------

function awake () {

    table = loadTable('AFINN-111.txt', 'tsv');
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

    // tsv 파일을 json파일로 저장한다.

    for( var i=0; i<table.getRowCount(); ++i ) {
        var row = table.getRow(i);
        var word = row.get(0);
        var score = row.get(1);
        //console.log(word,score);
        afinn[word] = score;
    }
    //console.log(afinn);
    save(afinn,'AFINN-111.json');

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

