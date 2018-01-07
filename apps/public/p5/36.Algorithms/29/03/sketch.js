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

var r       = 4;
var k       = 30;
var w       = r / Math.sqrt(2);
var cols    = 0;
var rows    = 0;
var grid    = [];
var active  = [];
var ordered = [];

// ......


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Poisson-disc Sampling : 푸아송 디스크 샘플링');
    createDiv('');
    createA('https://www.cct.lsu.edu/~fharhad/ganbatte/siggraph2007/CD2/content/sketches/0250.pdf','Fast Poisson Disk Sampling in Arbitrary Dimensions pdf');
    createDiv('');
    createDiv('생상화');

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

    // STEP 2 : 샘플링

    for( var total=0; total<25; ++total ) {

        if( active.length>0 ) {

            var randIndex = floor( random(active.length) );
            var pos = active[randIndex];

            var found = false;
            for( var n=0; n<k; ++n ) {

                var sample = p5.Vector.random2D();
                var m = random( r, 2*r );
                sample.setMag(m);
                sample.add(pos);

                var col = floor(sample.x / w);
                var row = floor(sample.y / w);

                if (col > -1 && row > -1 && col < cols && row < rows && !grid[col + row * cols]) {

                    var ok = true;
                    for( var i=-1; i<=1; ++i ) {
                        for( var j=-1; j<=1; ++j ) {
                            var index = (col+i)+(row+j)*cols;
                            var neighbor = grid[index];
                            if( neighbor ) {
                                var d = p5.Vector.dist( sample, neighbor );
                                if( d < r ) {
                                    ok = false;
                                }
                            }
                        }
                    }

                    if( ok ) {
                        found = true;
                        grid[col+row*cols] = sample;
                        active.push(sample);
                        ordered.push(sample);
                        break;
                    }
                }
            }

            if( !found ) {
                active.splice( randIndex, 1 );
            }
        }
    }

    // 침식중인 포인트 드로잉

    for( var i=0; i<ordered.length; ++i ) {

        var o = ordered[i];
        if( o ) {
            stroke( i % 360, 100, 100 );
            strokeWeight(r*0.5);
            point( o.x, o.y );
        }
    }

    // 침식된 포인트 드로잉

    //for( var i=0; i<active.length; ++i ) {
    //    var a = active[i];
    //    stroke(255,0,255);
    //    strokeWeight(1);
    //    point( a.x, a.y );
    //}


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
    strokeWeight(4);


    // STEP 0 : 그리드 초기화

    cols = floor(width/w);
    rows = floor(height/w);
    for( var i=0; i<cols*rows; ++i ) {
        grid[i] = undefined;
    }

    // STEP 1 : 그리드 벡터 설정

    //var x = random(width);
    //var y = random(height);
    var x = width/2;
    var y = height/2;

    var i = floor(x/w);
    var j = floor(y/w);
    var pos = createVector(x,y);
    grid[ i+j*cols ] = pos;
    active.push(pos);

    // ......

    if( fps ) fps.remove();
    fps  = createDiv('');

    if( desc ) desc.remove();
    desc = createDiv(desc);

    changing = false;
}

