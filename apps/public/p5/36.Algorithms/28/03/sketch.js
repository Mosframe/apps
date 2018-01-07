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

var player;
var playerStartScale = 64;
var zoom = 1;


var numBlob = 200;
var blobs = [];


// ......


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Agar.io : Agar.io 게임 구현');
    createDiv('');
    createA('https://en.wikipedia.org/wiki/Agar.io','Agar.io wiki');
    createDiv('');
    createDiv('먹이 먹기');

    createSpan('width:');
    widthSlider = createSlider( 100, 1000, 600, 10 ).changed( ()=>{
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


    // 화면 중심 포커스

    translate( width/2, height/2 );

    // zoom out : 자연스런 zoom 처리

    var newZoom = playerStartScale / player.radius;
    zoom = lerp( zoom, newZoom, 0.1 );
    scale( zoom );

    // 플레이어 중심 배경 스크롤

    translate( -player.pos.x, -player.pos.y );

    // 플레이어

    player.draw();
    player.update();

    // 먹이들

    for( var i=blobs.length-1; i>=0; --i ) {
        let blob = blobs[i];

        // 드로잉

        blob.draw();

        // 충돌 체크

        if( player.eats( blob ) ) {
            blobs.splice( i, 1 );
        }
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

    pixelDensity(1);
    //frameRate(5);
    //background(0);
    //colorMode(HSB);
    //angleMode(DEGREES);

    player = new Blob( 0, 0, playerStartScale );
    for( var i=0; i<numBlob; ++i ) {
        var x = random(-width,width);
        var y = random(-height,height);
        blobs[i] = new Blob( x, y, 16 );
    }

    // ......

    if( fps ) fps.remove();
    fps  = createDiv('');

    if( desc ) desc.remove();
    desc = createDiv(desc);

    changing = false;
}

