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
var is3D;

var particleWeightSlider;
var particleLifespanSlider;
var explosionAmountSlider;
var explosionDampingSlider;
var explosionForceSlider;
var is3DCheckbox;

// ...


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Fireworks : 볼꽃(폭죽)');
    createDiv('');
    createDiv('3D화');

    createSpan('width:');
    widthSlider = createSlider( 100, 1000, 800, 10 ).changed( ()=>{
        reset();
    });
    createSpan('height:');
    heightSlider = createSlider( 100, 1000, 400, 10 ).changed( ()=>{
        reset();
    });
    createDiv('');

    // ...

    createSpan('particleWeight:');
    particleWeightSlider = createSlider( 1, 10, 2, 1 ).touchMoved( ()=>{
        particleWeight = particleWeightSlider.value();
    });
    createSpan('particleLifespan:');
    particleLifespanSlider = createSlider( 1, 200, 64, 1 ).touchMoved( ()=>{
        particleLifespan = particleLifespanSlider.value();
    });
    createDiv('');
    createSpan('explosionAmount:');
    explosionAmountSlider = createSlider( 10, 200, 50, 1 ).touchMoved( ()=>{
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
    is3DCheckbox = createCheckbox( '3D', false ).changed( ()=>{
        reset();

        // TODO : 3D에서 2D로 전향하는 방법을 찾아야 한다.
        if( is3D ) {
            is3DCheckbox.remove();
        }
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
    if( is3D ) {
        background( 0 );
    } else {
        background( 0, 0, 0, 25 ); // 모션 블러 효과
    }
    colorMode(HSB);

    // ...

    if( is3D ) {
        // camera
        {
            // camera([x],[y],[z],[centerX],[centerY],[centerZ],[upX],[upY],[upZ])
            let x = cos(map(mouseX,0,width,-PI,PI))*500;
            let y = map(mouseY,0,height,-500,500);
            let z = sin(map(mouseX,0,width,-PI,PI))*500;
            camera(x, y, z, 0, 0, 0, 0, 1, 0 );
        }

        // light
        {
            ambientLight(0);
            let density = 0.5;
            let dirY = (mouseY/height - 0.5) * density;
            let dirX = (mouseX/width  - 0.5) * density;
            directionalLight(255, 255, 255, dirX, dirY, 1);
            // pointLight(r,g,b,x,y,z)
            //pointLight( 255, 255, 255, 0, 0, 0 );
        }
    }


    if( random(1) < 0.3 ) {
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

    is3D        = is3DCheckbox.checked();
    let width   = widthSlider.value();
    let height  = heightSlider.value();

    if( thisCanvas ) thisCanvas.remove();
    if( is3D ) {
        thisCanvas = createCanvas(width,height,WEBGL);
    } else {
        thisCanvas = createCanvas(width,height,P2D);
        console.log(thisCanvas);
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

    if( fps ) fps.remove();
    fps  = createDiv('');

    if( desc ) desc.remove();
    desc = createDiv(desc);

    changing = false;
}



