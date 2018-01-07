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

var wire;

var density;

var a = 1;
var b = 1;

var m1;
var n1_1;
var n1_2;
var n1_3;

var m2;
var n2_1;
var n2_2;
var n2_3;

var wireCheckbox;
var densitySlider;
var m1Slider;
var n1_1Input;
var n1_2Input;
var n1_3Input;
var m2Slider;
var n2_1Input;
var n2_2Input;
var n2_3Input;

var globe;

var colorOffset = 0;

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

    wireCheckbox = createCheckbox( 'wire', false ).changed( ()=>{
        wire = wireCheckbox.checked();
    });

    createSpan('density:');
    densitySlider = createSlider( 0, 200, 50, 1 ).touchMoved( ()=>{
        reset();
    });

    createDiv('');
    createSpan('m1:');
    m1Slider = createSlider( 0, 100, 7, 0.1 ).touchMoved( ()=>{
        m1 = m1Slider.value();
    });
    createSpan('n1_1:');
    n1_1Input = createInput( 0.2 ).input( ()=>{
        n1_1 = Number(n1_1Input.value());
    });
    createSpan('n1_2:');
    n1_2Input = createInput( 1.7 ).input( ()=>{
        n1_2 = Number(n1_2Input.value());
    });
    createSpan('n1_3:');
    n1_3Input = createInput( 1.7 ).input( ()=>{
        n1_3 = Number(n1_3Input.value());
    });

    createDiv('');
    createSpan('m2:');
    m2Slider = createSlider( 0, 100, 7, 0.1 ).touchMoved( ()=>{
        m2 = m2Slider.value();
    });
    createSpan('n2_1:');
    n2_1Input = createInput( 0.2 ).input( ()=>{
        n2_1 = Number(n2_1Input.value());
    });
    createSpan('n2_2:');
    n2_2Input = createInput( 1.7 ).input( ()=>{
        n2_2 = Number(n2_2Input.value());
    });
    createSpan('n2_3:');
    n2_3Input = createInput( 1.7 ).input( ()=>{
        n2_3 = Number(n2_3Input.value());
    });

    createDiv('');
    createButton('{0}').mousePressed( ()=>{
        m1  = 0;
        m1Slider.value(m1);
        m2  = 0;
        m2Slider.value(m2);
    });
    createButton('{2,0.7,0.3,0.2},{3,100,100,100}').mousePressed( ()=>{
        m1  = 2;
        n1_1 = 0.7;
        n1_2 = 0.3;
        n1_3 = 0.2;
        m1Slider.value(m1);
        n1_1Input.value(n1_1);
        n1_2Input.value(n1_2);
        n1_3Input.value(n1_3);

        m2  = 3;
        n2_1 = 100;
        n2_2 = 100;
        n2_3 = 100;
        m2Slider.value(m2);
        n2_1Input.value(n2_1);
        n2_2Input.value(n2_2);
        n2_3Input.value(n2_3);
    });
    createButton('{7,0.2,1.7,1.7},{7,0.2,1.7,1.7}').mousePressed( ()=>{
        m1  = 7;
        n1_1 = 0.2;
        n1_2 = 1.7;
        n1_3 = 1.7;
        m1Slider.value(m1);
        n1_1Input.value(n1_1);
        n1_2Input.value(n1_2);
        n1_3Input.value(n1_3);

        m2  = 7;
        n2_1 = 0.2;
        n2_2 = 1.7;
        n2_3 = 1.7;
        m2Slider.value(m2);
        n2_1Input.value(n2_1);
        n2_2Input.value(n2_2);
        n2_3Input.value(n2_3);
    });
    createButton('{8,60,100,30},{2,10.10,10}').mousePressed( ()=>{
        m1  = 8;
        n1_1 = 60;
        n1_2 = 100;
        n1_3 = 30;
        m1Slider.value(m1);
        n1_1Input.value(n1_1);
        n1_2Input.value(n1_2);
        n1_3Input.value(n1_3);

        m2  = 2;
        n2_1 = 10;
        n2_2 = 10;
        n2_3 = 10;
        m2Slider.value(m2);
        n2_1Input.value(n2_1);
        n2_2Input.value(n2_2);
        n2_3Input.value(n2_3);
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

    background(0);

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
        ambientLight(50);
        let density = 0.5;
        let dirY = (mouseY/height - 0.5) * density;
        let dirX = (mouseX/width  - 0.5) * density;
        //directionalLight(255, 255, 255, dirX, dirY, 1);
        // pointLight(r,g,b,x,y,z)
        pointLight( 255, 255, 255, 0, 0, 0 );
    }


    //  좌표 생성

    var r = 200;
    for( var i=0; i<density+1; ++i ) {

        var latitude = map( i, 0, density, -HALF_PI, HALF_PI ); // 위도(y)
        var r2 = supershape( latitude, m2, n2_1, n2_2, n2_3 );

        for( var j=0; j<density+1; ++j ) {

            var longitude = map( j, 0, density, -PI, PI ); // 경도 (x)
            var r1 = supershape( longitude, m1, n1_1, n1_2, n1_3 );

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

    if( wire ) {
        stroke(255);
        //strokeWeight(2);
        noFill();
    } else {
        noStroke();
    }

    colorOffset += 2;

    for( var i=0; i<density; ++i ) {
        if( !wire ) {
            var hu = map(i, 0, density, 0, 255*6 );
            fill( (hu+colorOffset) % 255, 255, 255);
        }
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

    wire    = wireCheckbox.checked();
    density = densitySlider.value();
    m1      = m1Slider.value();
    n1_1    = Number(n1_1Input.value());
    n1_2    = Number(n1_2Input.value());
    n1_3    = Number(n1_3Input.value());
    m2      = m2Slider.value();
    n2_1    = Number(n2_1Input.value());
    n2_2    = Number(n2_2Input.value());
    n2_3    = Number(n2_3Input.value());

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



//function supershape ( theta, m, n1, n2, n3 ) {
//}

// 슈퍼 쉐이프

function supershape ( theta, m, n1, n2, n3 ) {

    // 완전한 구체
    // var r = 1;
    // return r;

    var t1 = abs((1/a)*cos(m * theta/4));
    t1 = pow( t1, n2 );
    var t2 = abs((1/b)*sin(m * theta/4));
    t2 = pow( t2, n3 );
    var t3 = t1 + t2;
    var r = pow( t3, -1/n1 );

    return r;
}