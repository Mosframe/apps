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

var blobs = [];

// ......


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Metaballs : 메타볼 : 데이터 비주얼라이징');
    createDiv('');
    createA('https://www.gamedev.net/articles/programming/graphics/exploring-metaballs-and-isosurfaces-in-2d-r2556/','Exploring Metaballs and Isosurfaces in 2D');
    createDiv('');
    createDiv('Colorization');

    createSpan('width:');
    widthSlider = createSlider( 100, 1000, 300, 10 ).changed( ()=>{
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
    if( is3D ) {
        background( 0 );
    } else {
        background( 51 );
    }
    //colorMode(HSB);

    // ......

    loadPixels();

    for( var x=0; x<width; ++x ) {
        for( var y=0; y<height; ++y ) {

            var sum = 0;
            for( var blob of blobs ) {

                var d = dist( x, y, blob.pos.x, blob.pos.y );
                sum += 10 * blob.radius / d;
            }

            var hsb = color( sum, 255, 255 );
            set( x, y, hsb );
        }
    }

    updatePixels();

    for( var blob of blobs ) {
        blob.update();
        //blob.draw();
    }

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

    background(0);
    colorMode(HSB);

    blobs = [];
    for( var i=0; i<3; ++i ) {
        blobs.push( new Blob( random(width), random(height) ) );
    }

    // ......

    if( fps ) fps.remove();
    fps  = createDiv('');

    if( desc ) desc.remove();
    desc = createDiv(desc);

    changing = false;
}

