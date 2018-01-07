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
var is3DCheckbox;

var is3D;
var fps;
var desc;
var changing = true;

// ......

var population;
var lifespan    = 400; // 유전자 수명(배열길이)
var lifeCount   = 0; // 유전자 수명 count;

var target;
var maxForce    = 0.2; // 유전자 최대 포스
var maxFitness  = 0;
var generation  = 1;

var rx = 100;
var ry = 150;
var rw = 200;
var rh = 10;

// ......


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Smart Rockets : 스마트 로켓');
    createDiv('');
    createA('http://www.blprnt.com/smartrockets/','Smart Rockets');
    createDiv('');
    createDiv('장해물(Obstacle) 설정');

    createSpan('width:');
    widthSlider = createSlider( 100, 1000, 400, 10 ).changed( ()=>{
        reset();
    });
    createSpan('height:');
    heightSlider = createSlider( 100, 1000, 300, 10 ).changed( ()=>{
        reset();
    });
    is3DCheckbox = createCheckbox( '3D', false ).changed( ()=>{
        reset();

        // TODO : 3D에서 2D로 전향하는 방법을 찾아야 한다.
        if( is3D ) {
            is3DCheckbox.remove();
        }
    });
    is3DCheckbox.remove();
    createDiv('');

    // ......

    // ......

    createDiv('');
}

function setup () {

    reset();
}

function draw () {

    if( changing ) return;

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

    //colorMode(RGB);
    background( 0 );
    //colorMode(HSB);

    // ......


    // 모든 로켓 임무 수행

    population.run();

    ++lifeCount;

    // 다음 세대 설정

    if( lifeCount == lifespan ) {
        population.evaluate();
        population.selection();
        lifeCount = 0;
        ++generation;
    }

    // 장해물(Obstacle)

    fill(255);
    rect( rx, ry, rw, rh );

    // 목표물

    ellipse( target.x, target.y, 16, 16 );

    // ......

    fps.html( 'fps : ' + floor(frameRate()) );
    desc.html(`
    3D=${is3D}<br/>
    generation=${generation}<br/>
    lifeCount=${lifeCount-1}<br/>
    maxFitness=${floor(maxFitness)}<br/>
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
    }

    //frameRate(5);
    pixelDensity(1);

    // ......

    //background(0);
    //colorMode(HSB);

    population = new Population();

    target = createVector( width/2, 50 );


    // ......

    if( fps ) fps.remove();
    fps  = createDiv('');

    if( desc ) desc.remove();
    desc = createDiv(desc);

    changing = false;
}

