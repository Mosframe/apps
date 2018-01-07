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


// ......


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Smart Rockets : 스마트 로켓');
    createDiv('');
    createA('http://www.blprnt.com/smartrockets/','Smart Rockets');
    createDiv('');
    createDiv('기본 프레임워크 구현');

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

    population.run();

    // ......

    fps.html( 'fps : ' + floor(frameRate()) );
    desc.html(`
    3D=${is3D}<br/>
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


    // ......

    if( fps ) fps.remove();
    fps  = createDiv('');

    if( desc ) desc.remove();
    desc = createDiv(desc);

    changing = false;
}

