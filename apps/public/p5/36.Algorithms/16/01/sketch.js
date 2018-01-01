/**
 * sketch.js
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */

/*


*/
// -----------------------------------------------------------------
// 전역 변수들
// -----------------------------------------------------------------
var thisCanvas;
var widthSlider;
var heightSlider;
var showParticlesCheckbox;
var changing = true;

var Vec2D           = toxi.geom.Vec2D;
var VerletPhysics2D = toxi.physics2d.VerletPhysics2D;
var VerletSpring2D  = toxi.physics2d.VerletSpring2D;
var VerletParticle2D= toxi.physics2d.VerletParticle2D;
var GravityBehavior = toxi.physics2d.behaviors.GravityBehavior

var physics;

var w = 10;
var particles   = [];
var springs     = [];

var showParticles;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    createElement('h1','Cloth  : 천 구현 (toxiclibs 라이브러리 사용)');
    createA('http://toxiclibs.org/','toxiclibs');
    createDiv('');
    createA('http://haptic-data.com/toxiclibsjs','toxiclibs.js');
    createDiv('');
    createDiv('기본 프레임워크 구현');

    createSpan('width:');
    widthSlider = createSlider( 100, 1000, 600, 10 ).changed( ()=>{
        reset();
    });
    createSpan('height:');
    heightSlider = createSlider( 100, 1000, 400, 10 ).changed( ()=>{
        reset();
    });
    showParticlesCheckbox = createCheckbox( 'showParticles', false ).changed( ()=>{
        showParticles = showParticlesCheckbox.checked();
    });

    createDiv('');
}

function setup () {

    reset();
}

function draw () {

    if( changing ) return;

    background(51);

    physics.update();

    // particles

    if( showParticles ) {
        for( var p of particles ) {
            p.draw();
        }
    }

    // springs

    for( var s of springs ) {
        s.draw();
    }

}


// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------


function reset () {

    changing = true;

    // 캔버스 설정

    var width = widthSlider.value();
    var height = heightSlider.value();

    if( !thisCanvas ) {
        thisCanvas = createCanvas(width,height);
    } else {
        resizeCanvas(width,height);
    }

    //frameRate(5);
    pixelDensity(1);

    // 초기화

    showParticles = showParticlesCheckbox.checked();

    particles   = [];
    springs     = [];

    // 물리 설정

    physics = new VerletPhysics2D();
    var gravity = new Vec2D(0,1);
    var gb = new GravityBehavior( gravity );
    physics.addBehavior( gb );

    // 파티클 생성

    var x = 100;
    var y = 10;

    for( var i=0; i<40; ++i ) {
        var p = new Particle( x, y );
        particles.push(p);
        physics.addParticle(p);
        x = x + w;
    }

    // 스프링 생성 + 파티클에 링크

    for( var i=1; i<particles.length; ++i ) {
        var a = particles[i-1];
        var b = particles[i-0];
        var s = new Spring( a, b );
        springs.push(s);
        physics.addSpring(s);
    }

    // 루트 파티클 고정

    var p1 = particles[0];
    p1.lock();
    var p2 = particles[particles.length-1];
    p2.lock();

    changing = false;
}
