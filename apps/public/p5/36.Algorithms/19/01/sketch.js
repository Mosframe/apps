/**
 * sketch.js
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 전역 변수들
// -----------------------------------------------------------------
var thisCanvas;
var widthSlider;
var heightSlider;
var changing = true;

// ...

var modeSelect;
var radiusSlider;
var aSlider;
var bSlider;
var n1Slider;
var n2Slider;
var n3Slider;
var mSlider;
var edgeCountSlider;
var aniCheckbox;


var mode = 'Supershapes';

var radius      = 100;
var edgeCount   = 500;

var n1 = 1;
var n2 = 1;
var n3 = 1;
var m = 1;
var a = 1;
var b = 1;

var ani = false;
var osc = 0;


// ...


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Supershapes : 슈퍼쉐이프');
    createA('http://paulbourke.net/geometry/supershape/','Supershapes (Superformula)');
    createDiv('');
    createDiv('기본 프레임워크 구현');

    createSpan('width:');
    widthSlider = createSlider( 100, 1000, 400, 10 ).changed( ()=>{
        reset();
    });
    createSpan('height:');
    heightSlider = createSlider( 100, 1000, 400, 10 ).changed( ()=>{
        reset();
    });
    createDiv('');

    // ...

    createSpan('mode:');
    modeSelect = createSelect('Supershapes').changed( ()=>{
        mode = modeSelect.value();
    });
    modeSelect.option('circle');
    modeSelect.option('Superellipse');
    modeSelect.option('Supershapes');
    modeSelect.value(mode);
    createDiv('');

    createSpan('radius:');
    radiusSlider = createSlider( 0, 1000, 100, 0.1 ).touchMoved( ()=>{
        radius = radiusSlider.value();
    });
    createSpan('edgeCount:');
    edgeCountSlider = createSlider( 0, 1000, 500, 1 ).touchMoved( ()=>{
        edgeCount = edgeCountSlider.value();
    });
    createDiv('');
    createSpan('a:');
    aSlider = createSlider( 0, 100, 1, 0.01 ).touchMoved( ()=>{
        a = aSlider.value();
    });
    createSpan('b:');
    bSlider = createSlider( 0, 100, 1, 0.01 ).touchMoved( ()=>{
        b = bSlider.value();
    });
    createDiv('');
    createSpan('n1:');
    n1Slider = createSlider( 0, 100, 1, 0.01 ).touchMoved( ()=>{
        n1 = n1Slider.value();
    });
    createSpan('n2:');
    n2Slider = createSlider( 0, 100, 1, 0.01 ).touchMoved( ()=>{
        n2 = n2Slider.value();
    });
    createSpan('n3:');
    n3Slider = createSlider( 0, 100, 1, 0.01 ).touchMoved( ()=>{
        n3 = n3Slider.value();
    });
    createDiv('');
    createSpan('m:');
    mSlider = createSlider( 0, 100, 5, 0.01 ).touchMoved( ()=>{
        m = mSlider.value();
    });
    createDiv('');
    createButton('1,1,1,6').mousePressed( ()=>{

        n1 = 1;
        n2 = 1;
        n3 = 1;
        m  = 6;

        n1Slider.value(n1);
        n2Slider.value(n2);
        n3Slider.value(n3);
        mSlider.value(m);
    });
    createButton('0.3,0.3,0.3,6').mousePressed( ()=>{

        n1 = 0.3;
        n2 = 0.3;
        n3 = 0.3;
        m  = 6;

        n1Slider.value(n1);
        n2Slider.value(n2);
        n3Slider.value(n3);
        mSlider.value(m);
    });
    createButton('40,10,10,6').mousePressed( ()=>{

        n1 = 40;
        n2 = 10;
        n3 = 10;
        m  = 6;

        n1Slider.value(n1);
        n2Slider.value(n2);
        n3Slider.value(n3);
        mSlider.value(m);
    });
    createButton('60,55,30,6').mousePressed( ()=>{

        n1 = 60;
        n2 = 55;
        n3 = 30;
        m  = 6;

        n1Slider.value(n1);
        n2Slider.value(n2);
        n3Slider.value(n3);
        mSlider.value(m);
    });
    createButton('60,55,30,13/6').mousePressed( ()=>{

        n1 = 60;
        n2 = 55;
        n3 = 30;
        m  = 13/6;

        n1Slider.value(n1);
        n2Slider.value(n2);
        n3Slider.value(n3);
        mSlider.value(m);
    });
    createButton('5,1.7,1.7,5').mousePressed( ()=>{

        n1 = 5;
        n2 = 1.7;
        n3 = 1.7;
        m  = 5;

        n1Slider.value(n1);
        n2Slider.value(n2);
        n3Slider.value(n3);
        mSlider.value(m);
    });
    aniCheckbox = createCheckbox( 'ani', true ).changed( ()=>{
        ani = aniCheckbox.checked();
    });

    // ...

    createDiv('');
}

function setup () {

    reset();
}

function draw () {

    if( changing ) return;

    // ...

    background(51);

    stroke(255);
    noFill();

    if( ani ) {
        m = map(sin(osc), -1, 1, 0, 10);
        osc += 0.02;
        mSlider.value(m);
    }

    translate( width/2, height/2 );

    var increment = TWO_PI / edgeCount;

    beginShape();
    switch(mode) {
    case 'circle':
        var aa = a * radius;
        var bb = b * radius;
        for( var angle=0; angle<TWO_PI; angle += increment ) {
            var x = aa * cos(angle);
            var y = bb * sin(angle);
            vertex(x,y);
        }
        break;
    case 'Superellipse':
        var aa = a * radius;
        var bb = b * radius;
        for( var angle=0; angle<TWO_PI; angle += increment ) {
            var na = 2/n1;
            var x = pow( abs(cos(angle)), na ) * aa * sgn(cos(angle));
            var y = pow( abs(sin(angle)), na ) * bb * sgn(sin(angle));
            vertex(x,y);
        }
        break;
    case 'Supershapes':
        for( var angle=0; angle<TWO_PI; angle += increment ) {
            var r = supershape( angle );
            var x = radius * r * cos(angle);
            var y = radius * r * sin(angle);
            vertex(x,y);
        }
        break;
    }
    endShape(CLOSE);

    // ...
}


// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------


function reset () {

    changing = true;

    // 캔버스 설정

    var width   = widthSlider.value();
    var height  = heightSlider.value();

    if( !thisCanvas ) {
        thisCanvas = createCanvas(width,height);
    } else {
        resizeCanvas(width,height);
    }

    //frameRate(5);
    pixelDensity(1);

    // ...

    mode        = modeSelect.value();
    radius      = radiusSlider.value();
    edgeCount   = edgeCountSlider.value();
    a           = aSlider.value();
    b           = bSlider.value();
    n1          = n1Slider.value();
    n2          = n2Slider.value();
    n3          = n3Slider.value();
    m           = mSlider.value();
    ani         = aniCheckbox.checked();

    // ...

    changing = false;
}

// 값의 사인값 얻기

function sgn ( val ) {

    if( val > 0 ) {
        return 1;
    }
    else
    if( val < 0 ) {
        return -1;
    }
    return 0;
}

function supershape ( theta ) {

    var r = 1;

    var part1 = (1/a) * cos(theta * m / 4);
    part1 = abs(part1);
    part1 = pow(part1, n2);

    var part2 = (1/b) * sin(theta * m / 4);
    part2 = abs(part2);
    part2 = pow(part2, n3);

    var part3 = n1 * pow( part1+part2, 1/n1 );

    if( part3 === 0 ) {
        return 0;
    }

    return 1 / part3;
}