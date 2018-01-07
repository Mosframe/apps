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

var bird;
var pipes = [];

var scrollSpeed     = 2; // 배경 스크롤 속도
var pipeWidth       = 20; // 파이프 넓이
var pipeSpawnFreq   = 80; // 파이프 스폰 주기

// ......


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Flappy Bird : 플로피 버드 게임');
    createDiv('');
    createA('https://en.wikipedia.org/wiki/Flappy_Bird','Flappy Bird wiki');
    createDiv('');
    createDiv('파이프 충돌처리');

    createSpan('width:');
    widthSlider = createSlider( 100, 1000, 400, 10 ).changed( ()=>{
        reset();
    });
    createSpan('height:');
    heightSlider = createSlider( 100, 1000, 600, 10 ).changed( ()=>{
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

function keyPressed () {
    if( key == ' ' ) {
        bird.up();
    }
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

    // ......

    //colorMode(RGB);
    background( 0 );
    //colorMode(HSB);

    // 파이프들

    for( var i=pipes.length-1; i>=0; --i ) {
        var pipe = pipes[i];

        pipe.update();
        pipe.draw();

        // 충돌 체크

        if( pipe.hits(bird) ) {

        }

        if( pipes[i].isOffScreen() ) {
            pipes.splice( i,1 );
        }
    }

    // 버드

    bird.update();
    bird.draw();

    // 파이프 스폰

    if( frameCount % 80 == 0 ) {

        pipes.push( new Pipe() );
    }


    // ......

    fps.html( 'fps : ' + floor(frameRate()) );
    desc.html(`
    3D=${is3D}<br/>
    width=${width}<br/>
    height=${height}<br/>
    pipeCount=${pipes.length}<br/>
    scrollSpeed=${scrollSpeed}<br/>
    pipeWidth=${pipeWidth}<br/>
    pipeSpawnFreq=${pipeSpawnFreq}<br/>
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


    // ......

    pixelDensity(1);
    //frameRate(5);
    //background(0);
    //colorMode(HSB);
    //angleMode(DEGREES);

    bird = new Bird();
    pipes.push( new Pipe() );

    // ......

    if( fps ) fps.remove();
    fps  = createDiv('');

    if( desc ) desc.remove();
    desc = createDiv(desc);

    changing = false;
}

