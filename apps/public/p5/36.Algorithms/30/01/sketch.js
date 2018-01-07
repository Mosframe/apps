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

var tree    = [];
var r       = 4;

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
    createDiv('기본 프레임워크 구현');

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

    // 트리 성장

    var walker = createVector( random(width), random(height) );

    // 다른 가지에 출돌할때까지 성장

    var stuck = false; // 충돌해서 멈춤
    while(!stuck) {
        for( var i=0; i<tree.length; ++i ) {
            var t = tree[i];
            var d = p5.Vector.dist( walker, t );
            if( d < r*2 ) {
                stuck = true;
                break;
            }
        }
        var velocity = p5.Vector.random2D();
        walker.add(velocity);
        walker.x = constrain(walker.x, 0, width);
        walker.y = constrain(walker.y, 0, height);
    }
    tree.push(walker);

    // 트리 드로잉

    for( var i=0; i<tree.length; ++i ) {
        var t = tree[i];
        strokeWeight(r*2);
        stroke(255, 100);
        point( t.x, t.y );
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
    // colorMode(HSB);
    // angleMode(DEGREES);
    // strokeWeight(4);


    tree[0] = createVector( width/2, height/2 );


    // ......

    if( fps ) fps.remove();
    fps  = createDiv('');

    if( desc ) desc.remove();
    desc = createDiv(desc);

    changing = false;
}

