/**
 * sketch.js
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 변수, 오브젝트 정의
// -----------------------------------------------------------------
var sun;
var radius = 200;
var planetTextures = [];
var moonTex;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Solar System : 태양계 구현');
    createP('텍스춰 설정');
    createP('http://planetpixelemporium.com');
    createP('');

    planetTextures[0] = loadImage('../../../../images/sun.jpg');
    planetTextures[1] = loadImage('../../../../images/mercury.jpg');
    planetTextures[2] = loadImage('../../../../images/venus.jpg');
    planetTextures[3] = loadImage('../../../../images/earth.jpg');
    planetTextures[4] = loadImage('../../../../images/mars.jpg');
    planetTextures[5] = loadImage('../../../../images/jupiter.jpg');
    planetTextures[6] = loadImage('../../../../images/saturn.jpg');
    planetTextures[7] = loadImage('../../../../images/uranus.jpg');
    planetTextures[8] = loadImage('../../../../images/neptune.jpg');
    planetTextures[9] = loadImage('../../../../images/pluto.jpg');

    moonTex = loadImage('../../../../images/moon.jpg');
}

function setup () {

    createCanvas(800,450,WEBGL);

    sun = new Planet( 50, 0, 0, planetTextures[0] );
    sun.spawnMoons( 9, 1 );

}

function draw () {

    background(0);

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


    // planets

    //translate( width/2, height/2 );
    sun.show();
    sun.orbit();
}


// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------
