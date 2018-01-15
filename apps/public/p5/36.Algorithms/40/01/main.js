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

    title       = 'Context-Free GrammarCFG : 문맥 자유 문법';
    subTitle    = '기본 프레임워크 설정';

    referUrls.push({
        text:'Context-free grammar wiki',
        link:'https://en.wikipedia.org/wiki/Context-free_grammar'
    });
    referUrls.push({
        text:'문맥 자유 문법',
        link:'https://ko.wikipedia.org/wiki/%EB%AC%B8%EB%A7%A5_%EC%9E%90%EC%9C%A0_%EB%AC%B8%EB%B2%95'
    });


    defaultCanvasWidth  = 400;
    defaultCanvasHeight = 400;
}

// -----------------------------------------------------------------
// 프로젝트 전용 변수들
// -----------------------------------------------------------------
var rules = {
    "S": [
      ["NP", "VP"],
      ["Interj", "NP", "VP"]
    ],
    "NP": [
      ["Det", "N"],
      ["Det", "N", "that", "VP"],
      ["Det", "Adj", "N"]
    ],
    "VP": [
      ["Vtrans", "NP"],
      ["Vintr"]
    ],
    "Interj": [
      ["oh"],
      ["my"],
      ["wow"],
      ["darn"]
    ],
    "Det": [
      ["this"],
      ["that"],
      ["the"]
    ],
    "N": [
      ["amoeba"],
      ["dichotomy"],
      ["seagull"],
      ["trombone"],
      ["overstaffed"],
      ["corsage"]
    ],
    "Adj": [
      ["bald"],
      ["smug"],
      ["important"],
      ["tame"],
      ["overstaffed"],
      ["corsage"]
    ],
    "Vtrans": [
      ["computes"],
      ["examines"],
      ["foregrounds"],
    ],
    "Vintr": [
      ["coughs"],
      ["daydreams"],
      ["whines"],
    ]
  };

// -----------------------------------------------------------------
// 사전 작업 ( preload )
// -----------------------------------------------------------------

function awake () {

    createButton( "generate" ).mousePressed(cfg);
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

function cfg () {

    var start = "S";

    var expansion = [];
    var result = expand( start, expansion );
    console.log(result);
    createP(result);

}

// 룰을 적용하여 문장을 만든다.

function expand ( start, expansion ) {

    if( rules[start] ) {
        var pick = random(rules[start]);
        for( var i=0; i<pick.length; ++i ) {
            expand(pick[i], expansion);
        }
    } else {
        expansion.push(start);
    }
    return expansion.join(" ");;
}