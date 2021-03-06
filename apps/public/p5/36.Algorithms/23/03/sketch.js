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

var particleWeight;
var particleLifespan;
var explosionAmount;
var explosionDamping;
var explosionForce;

var particleWeightSlider;
var particleLifespanSlider;
var explosionAmountSlider;
var explosionDampingSlider;
var explosionForceSlider;

// ...


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Fireworks : 불꽃(폭죽)');
    createDiv('');
    createDiv('칼라 적용');

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

    createSpan('particleWeight:');
    particleWeightSlider = createSlider( 1, 20, 5, 1 ).touchMoved( ()=>{
        particleWeight = particleWeightSlider.value();
    });
    createSpan('particleLifespan:');
    particleLifespanSlider = createSlider( 1, 200, 64, 1 ).touchMoved( ()=>{
        particleLifespan = particleLifespanSlider.value();
    });
    createDiv('');
    createSpan('explosionAmount:');
    explosionAmountSlider = createSlider( 10, 200, 100, 1 ).touchMoved( ()=>{
        explosionAmount = explosionAmountSlider.value();
    });
    createSpan('explosionDamping:');
    explosionDampingSlider = createSlider( 0, 0.3, 0.1, 0.01 ).touchMoved( ()=>{
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

    colorMode(RGB);
    background( 0, 0, 0, 25 ); // 모션 블러 효과
    colorMode(HSB);

    // ...

    if( random(1) < 0.03 ) {
        fireworks.push( new Firework() );
    }

    for( var i=fireworks.length-1; i>=0; --i ) {

        if( fireworks[i].isDone() ) {
            fireworks.splice(i,1);
        } else {
            fireworks[i].update();
            fireworks[i].draw();
        }
    }


    // ...

    fps.html( 'fps : ' + floor(frameRate()) );
    desc.html(`
    fireworks=${fireworks.length}<br/>
    particleWeight=${particleWeight}<br/>
    particleLifespan=${particleLifespan}<br/>
    explosionAmount=${explosionAmount}<br/>
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
    background(0);

    // ...

    stroke(255);
    strokeWeight(4);

    gravity = createVector( 0, 0.2 );

    particleWeight      = particleWeightSlider.value();
    particleLifespan    = particleLifespanSlider.value();
    explosionAmount     = explosionAmountSlider.value();
    explosionDamping    = explosionDampingSlider.value();
    explosionForce      = explosionForceSlider.value();


    // ...

    if( !fps  ) fps  = createDiv('');
    if( !desc ) desc = createDiv(desc);

    changing = false;
}

