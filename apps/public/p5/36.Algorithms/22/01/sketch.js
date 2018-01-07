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

    createElement('h1','3D Supershapes : 3D 슈퍼쉐이프');
    createDiv('');
    createA('http://paulbourke.net/geometry/supershape/','Supershapes (Superformula)');
    createDiv('');
    createDiv('기본 공식 제작 : Spherical Geometry와 Supershape을 기반으로 만듬');

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
    densitySlider = createSlider( 0, 200, 25, 1 ).touchMoved( ()=>{
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

        var latitude = map( i, 0, density, -HALF_PI, HALF_PI ); // 위도(y)
        var r1 = supershape( latitude, 7, 0.2, 1.7, 1.7 );

        for( var j=0; j<density+1; ++j ) {

            var longitude = map( j, 0, density, -PI, PI ); // 경도 (x)
            var r2 = supershape( longitude, 7, 0.2, 1.7, 1.7 );

            var x = r * r1 * cos(longitude) * r2 * cos(latitude);
            var y = r * r1 * sin(longitude) * r2 * cos(latitude);
            var z = r * r2 * sin(latitude);

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
    stroke(255);
    //strokeWeight(2);
    //noStroke();
    noFill();

    for( var i=0; i<density; ++i ) {
        //var hu = map(i, 0, density, 0, 255*6 );
        //fill(hu % 255, 255, 255);
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


function supershape ( theta, m, n1, n2, n3 ) {

    var r = 1;

    return r;
}