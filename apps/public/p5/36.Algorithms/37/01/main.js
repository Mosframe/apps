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

    title       = 'TF-IDF : 정보 검색과 텍스트 마이닝에서 이용하는 가중치';
    subTitle    = '기본 프레임워크 설정';

    referUrls.push({
        text:'tf–idf wiki',
        link:'https://en.wikipedia.org/wiki/Tf%E2%80%93idf'
    });
    referUrls.push({
        text:'TF-IDF : 여러 문서로 이루어진 문서군이 있을 때 어떤 단어가 특정 문서 내에서 얼마나 중요한 것인지를 나타내는 통계적 수치이다.',
        link:'https://ko.wikipedia.org/wiki/TF-IDF'
    });


    defaultCanvasWidth  = 800;
    defaultCanvasHeight = 450;
}

// -----------------------------------------------------------------
// 프로젝트 전용 변수들
// -----------------------------------------------------------------
var txt = [];
var counts = {};
var keys = [];
var allwords = [];


// 파일들 : 첫번째 파일의 단어들을 토큰으로 사용
var files = [
    'rainbow.txt',
    'eclipse.txt',
    'fish.txt',
    'phadke.txt',
    'sports.txt',
    'test.txt',
    'tree.txt'
];

// -----------------------------------------------------------------
// 사전 작업 ( preload )
// -----------------------------------------------------------------

function awake () {

    for( var i=0; i<files.length; ++i ) {
        txt[i] = loadStrings( './files/'+files[i] );
    }
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

    // 모든 파일 읽기

    for( var i=0; i<txt.length; ++i ) {
        allwords[i] = txt[i].join('\n');
    }

    // 첫번째 파일의 단어들을 토큰으로 사용

    var tokens = allwords[0].split(/\W+/);
    // console.log( tokens );

    // 숫자가 아닌 단어만 카운트한다.

    if( !/\d+/.test(word) ) {

        // 단어 카운트 (tf)

        for( var i=0; i<tokens.length; ++i ) {
            var word = tokens[i].toLowerCase();
            if( counts[word] === undefined ) {
                counts[word] = {
                    tf: 1, // 단어 단위 카운트
                    df: 1  // 파일 단위 카운트
                };
                keys.push(word);
            } else {
                ++counts[word].tf;
            }
        }
    }

    // 모든 파일에 단어들이 포함되어 있는지 검색

    var othercounts = [];
    for( var j=1; j<allwords.length; ++j ) {
        var tempcounts = {};
        var tokens = allwords[j].split(/\W+/);
        for( var k=0; k<tokens.length; ++k ) {
            var w = tokens[k].toLowerCase();
            if( tempcounts[w] === undefined ) {
                tempcounts[w] = true;
            }
        }
        othercounts.push(tempcounts);
    }

    // 파일에 등장하는 단어 카운트 (df)

    for( var i=0; i<keys.length; ++i ) {
        var word = keys[i];
        for( var j=0; j<othercounts.length; ++j ) {
            var tempcounts = othercounts[j];
            if( tempcounts[word] ) {
                ++counts[word].df;
            }
        }
    }

    // 단어별로 중요도 가중치 계산 (TF-IDF)

    for( var i=0; i<keys.length; ++i ) {
        var word = keys[i];
        var wordobj = counts[word];
        wordobj.tfidf = wordobj.tf * log(files.length / wordobj.df);
    }

    // 정렬

    // keys.sort();
    keys.sort((a,b)=>{
        var countA = counts[a].tfidf;
        var countB = counts[b].tfidf;
        return countB-countA;
    });

    // 출력

    for( var i=0; i<keys.length; ++i ) {
        var key = keys[i];
        createDiv(key + ' ' + counts[key].tfidf );
    }

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
    //background( 0 );

}

// -----------------------------------------------------------------
// 프로젝트 전용 함수들
// -----------------------------------------------------------------
