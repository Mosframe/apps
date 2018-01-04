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


// ...


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Spherical Geometry : 구면기하학');
    createDiv('');
    createA('https://en.wikipedia.org/wiki/Spherical_coordinate_system','Spherical coordinate system wiki');
    createDiv('');
    createDiv('포인트 드로잉');

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

    // camera([x],[y],[z],[centerX],[centerY],[centerZ],[upX],[upY],[upZ])
    var x = cos(map(mouseX,0,width,-PI,PI))*500;
    var y = map(mouseY,0,height,-500,500);
    var z = sin(map(mouseX,0,width,-PI,PI))*500;
    camera(x, y, z, 0, 0, 0, 0, 1, 0 );

    // light

    ambientLight(0);
    var density = 0.5;
	var dirY = (mouseY/height - 0.5) * density;
	var dirX = (mouseX/width  - 0.5) * density;
    //directionalLight(255, 255, 255, dirX, dirY, 1);
    // pointLight(r,g,b,x,y,z)
    pointLight( 255, 255, 255, 0, 0, 0 );


    background(0);

    // 구체 드로잉

    fill(255);
    // sphere(200);

    //
    stroke(255);
    strokeWeight(4);

    var r = 200;
    var total = 20;
    for( var i=0; i<total; ++i ) {
        var longitude = map( i, 0, total, -PI, PI ); // 경도 (x)
        for( var j=0; j<total; ++j ) {
            var latitude = map( j, 0, total, -HALF_PI, HALF_PI ); // 위도(y)
            var x = r * sin(longitude) * cos(latitude);
            var y = r * sin(longitude) * sin(latitude);
            var z = r * cos(longitude);
            beginShape(POINTS);
            vertex(x,y,z);
            endShape();
        }
    }

    // ...

    fps.html( 'fps : ' + floor(frameRate()) );
    desc.html(`
    <br/>
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



    // ...

    if( !fps  ) fps  = createDiv('');
    if( !desc ) desc = createDiv(desc);

    changing = false;
}
