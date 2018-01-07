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

var maxWalker   = 50; // 최대 워커수 ( 최대 가지수 )
var iterations  = 1000; // 동시 작업자수
var radius      = 8;
var shrink      = 0.995; // 축소율
var hu          = 0; // hue
var walkers     = [];
var tree        = [];

// ......


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Diffusion-Limited Aggregation : 확산 제한 집합');
    createDiv('');
    createA('https://en.wikipedia.org/wiki/Diffusion-limited_aggregation','Diffusion-limited aggregation wiki');
    createDiv('');
    createA('http://paulbourke.net/fractals/dla/','DLA - Diffusion Limited Aggregation');
    createDiv('');
    createDiv('색상화');

    createSpan('width:');
    widthSlider = createSlider( 100, 1000, 400, 10 ).changed( ()=>{
        reset();
    });
    createSpan('height:');
    heightSlider = createSlider( 100, 1000, 400, 10 ).changed( ()=>{
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

    // ......

    // colorMode(RGB);
    background( 0 );
    // colorMode(HSB);
    // noLoop();

    // 트리 드로잉

    for( var i=0; i<tree.length; ++i ) {
        tree[i].draw();
    }

    // 워커들 드로잉

    for( var i=0; i<walkers.length; ++i ) {
        walkers[i].draw();
    }

    // 워커들 갱신

    for( var n=0; n<iterations; ++n ) {

        for( var i=walkers.length-1; i>=0; --i ) {
            var walker = walkers[i];
            walker.walk();
            if( walker.checkStuck(tree) ) {
                walker.hue = hu % 360;
                hu += 2;
                tree.push(walker);
                walkers.splice( i, 1 );
            }
        }
    }

    // 워크들을 최대로 유지한다.

    while( walkers.length < maxWalker && radius > 1 ) {

        // 점차 이동 반경을 축소시킨다.
        radius *= shrink;
        walkers.push( new Walker() );
    }

    // ......

    fps.html( 'fps : ' + floor(frameRate()) );
    desc.html(`
    3D=${is3D}<br/>
    width=${width}<br/>
    height=${height}<br/>
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

    // P5 전역 변수 설정

    pixelDensity(1);
    // frameRate(5);
    background(0);
    colorMode(HSB);
    // angleMode(DEGREES);
    // strokeWeight(4);

    // 하단에 트리들 생성

    //for( var x=0; x<width; ++x ) {
    //    tree.push( new Walker( x, height ) );
    //}

    // 스크린 중앙에 트리 생성

    tree[0] = new Walker(width/2,height/2);
    radius *= 0.99;

    // 워커들 생성

    for( var i=0; i<maxWalker; ++i ) {
        walkers[i]  = new Walker();
        radius *= shrink;
    }


    // ......

    if( fps ) fps.remove();
    fps  = createDiv('');

    if( desc ) desc.remove();
    desc = createDiv(desc);

    changing = false;
}


