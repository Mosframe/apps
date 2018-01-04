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

var globe;
var density = 20;

var densitySlider;

// ...


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Spherical Geometry : 구면기하학');
    createDiv('');
    createA('https://en.wikipedia.org/wiki/Spherical_coordinate_system','Spherical coordinate system wiki');
    createDiv('');
    createDiv('버텍스 드로잉');

    createSpan('width:');
    widthSlider = createSlider( 100, 1000, 600, 10 ).changed( ()=>{
        reset();
    });
    createSpan('height:');
    heightSlider = createSlider( 100, 1000, 600, 10 ).changed( ()=>{
        reset();
    });
    createDiv('');

    // ...

    createSpan('density:');
    densitySlider = createSlider( 0, 200, 20, 1 ).touchMoved( ()=>{
        reset();
    });

    // ...

    createDiv('');
}

function setup () {

    reset();
}

function draw () {

    if( changing ) return;

    // ...

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


    background(0);

    //  좌표 생성

    var r = 200;
    for( var i=0; i<density+1; ++i ) {
        var latitude = map( i, 0, density, 0, PI ); // 위도(y)
        for( var j=0; j<density+1; ++j ) {
            var longitude = map( j, 0, density, 0, TWO_PI ); // 경도 (x)
            var x = r * sin(latitude) * cos(longitude);
            var y = r * sin(latitude) * sin(longitude);
            var z = r * cos(latitude);

            globe[i][j].x = x;
            globe[i][j].y = y;
            globe[i][j].z = z;

            //v = p5.Vector.random3D();
            //v.mult(10);
            //globe[i][j].add(v);
        }
    }

    // 드로잉

    //fill(100);
    //stroke(255);
    //strokeWeight(2);
    noStroke();

    for( var i=0; i<density; ++i ) {
        var hu = map(i, 0, density, 0, 255*6 );
        fill(hu % 255, 255, 255);
        beginShape(TRIANGLE_STRIP);
        for( var j=0; j<density+1; ++j ) {
            var v1 = globe[i+0][j];
            var v2 = globe[i+1][j];
            vertex(v1.x,v1.y,v1.z);
            vertex(v2.x,v2.y,v2.z);
        }
        endShape();
    }

    // ...

    fps.html( 'fps : ' + floor(frameRate()) );
    desc.html(`
    density=${density}<br/>
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
        thisCanvas = createCanvas(width,height,WEBGL);
    } else {
        resizeCanvas(width,height);
    }

    //frameRate(5);
    pixelDensity(1);

    // ...

    colorMode(HSB);

    density = densitySlider.value();

    globe = [];
    for( var i=0; i<density+1; ++i ) {
        globe[i] = [];
        for( var j=0; j<density+1; ++j ) {
            globe[i][j] = createVector(0,0,0);
        }
    }

    // ...

    if( !fps  ) fps  = createDiv('');
    if( !desc ) desc = createDiv(desc);

    changing = false;
}
