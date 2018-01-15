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
var fps;
var desc;
var changing = true;

// ...

var fireworks = [];
var gravity;

var explosionDamping;
var explosionForce;

var explosionDampingSlider;
var explosionForceSlider;

// ...


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Fireworks : 불꽃(폭죽)');
    createDiv('');
    createDiv('기본 프레임워크 구현');

    createSpan('width:');
    widthSlider = createSlider( 100, 1000, 500, 10 ).changed( ()=>{
        reset();
    });
    createSpan('height:');
    heightSlider = createSlider( 100, 1000, 400, 10 ).changed( ()=>{
        reset();
    });
    createDiv('');

    // ...

    createSpan('explosionDamping:');
    explosionDampingSlider = createSlider( 0.7, 1, 0.9, 0.01 ).touchMoved( ()=>{
        explosionDamping = explosionDampingSlider.value();
    });
    createSpan('explosionForce:');
    explosionForceSlider = createSlider( 1, 20, 10, 0.01 ).touchMoved( ()=>{
        explosionForce = explosionForceSlider.value();
    });

    // ...

    createDiv('');
}

function setup () {

    reset();
}

function draw () {

    if( changing ) return;

    background(0);

    // ...

    if( random(1) < 0.03 ) {
        fireworks.push( new Firework() );
    }


    for( var i=0; i<fireworks.length; ++i ) {
        fireworks[i].update();
        fireworks[i].draw();
    }

    // 수명관리

    if( fireworks.length > 100 ) {
        fireworks.splice(i,1);
    }


    // ...

    fps.html( 'fps : ' + floor(frameRate()) );
    desc.html(`
    fireworks=${fireworks.length}<br/>
    explosionDamping=${explosionDamping}<br/>
    explosionForce=${explosionForce}<br/>
    `);
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
    //colorMode(HSB);

    // ...

    stroke(255);
    strokeWeight(4);

    gravity = createVector( 0, 0.2 );

    explosionDamping    = explosionDampingSlider.value();
    explosionForce      = explosionForceSlider.value();


    // ...

    if( !fps  ) fps  = createDiv('');
    if( !desc ) desc = createDiv(desc);

    changing = false;
}

