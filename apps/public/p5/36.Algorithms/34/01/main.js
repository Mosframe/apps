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

    title       = 'Word Interactor : 단어 인터렉터';
    subTitle    = '기본 프레임워크 설정';

    //referUrls.push({
    //    text:'',
    //    link:''
    //});

    defaultCanvasWidth  = 400;
    defaultCanvasHeight = 400;
}

// -----------------------------------------------------------------
// 프로젝트 전용 변수들
// -----------------------------------------------------------------
var textfield;
var output;
var submet;

// -----------------------------------------------------------------
// 사전 작업 ( preload )
// -----------------------------------------------------------------

function awake () {

    createP(`
    <textarea cols=50 rows=6 id="input">A rainbow is a meteorological phenomenon that is caused by reflection, refraction and dispersion of light in water droplets resulting in a spectrum of light appearing in the sky. It takes the form of a multicoloured arc. Rainbows caused by sunlight always appear in the section of sky directly opposite the sun.</textarea>
    <p><button id="submit">submit</button></p>
    <p id = "output"></p>
    `);
}

// -----------------------------------------------------------------
// 프레임 갱신 시작
// -----------------------------------------------------------------

function start () {

    // pixelDensity(1);
    //frameRate(5);
    background(0);
    //colorMode(HSB);
    // angleMode(DEGREES);
    removeCanvas();

    textfield   = select('#input');
    output      = select('#output');
    submit      = select('#submit');
    submit.mousePressed( newText );
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
    background( 0 );

}

// -----------------------------------------------------------------
// 프로젝트 전용 함수들
// -----------------------------------------------------------------


function newText() {
    var s = textfield.value();
    //createP(s);

    var words = s.split(/(\W+)/); // 단어를 분리 (스페이스바 포함)
    //console.log(words);

    for( var i=0; i<words.length; ++i ) {
        var word = words[i];
        var span = createSpan(word);
        span.parent(output);

        if( !/\W+/.test(word) ) { // 스페이스바 제외
            //span.style( 'background-color',color(random(255), random(255), random(255)) );
            span.mouseOver( highlight );
        }
    }
}

function highlight () {

    console.log(this.html());

    this.html('rainbow');
    var c = color( random(255), random(255), random(255) );
    this.style('background-color', c );
}