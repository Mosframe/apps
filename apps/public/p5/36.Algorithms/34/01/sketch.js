/**
 * sketch.js
 *
 * p5.js    : http://p5js.org/reference
 * web      : http://developer.mozilla.org
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 환경설정 변수들
// -----------------------------------------------------------------

var title       = '테스트 알고리즘';
var subTitle    = '기본 프레임워크 설정';
var referUrls   = []; //{link:'',text:''}

var defaultCanvasWidth  = 400;
var defaultCanvasHeight = 400;

var is3D;
var statuses = {};
var canvasElements = [];
var statusesView;

var thisCanvas;
var widthSlider;
var heightSlider;
var is3DCheckbox;

var changing = true;


// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

    description();

    createElement('h1',title);
    createDiv('');
    createElement('h3',subTitle);
    createDiv('');
    for( var r of referUrls ) {
        createA(r.link,r.text);
        createDiv('');
    }

    statuses.visible = true;

    createP('');
    createDiv('[ Inspector ]');

    createButton('statuses').mousePressed(()=>{
        statuses.visible = !statuses.visible;
        createStatusesView();
    });
    createDiv('');

    if( statuses.visible ) {

        canvasElements.push( createSpan('width:') );
        widthSlider = createSlider( 100, 1000, defaultCanvasWidth, 10 ).changed( ()=>{
            reset();
        });
        canvasElements.push( widthSlider );

        canvasElements.push( createSpan('height:') );
        heightSlider = createSlider( 100, 1000, defaultCanvasHeight, 10 ).changed( ()=>{
            reset();
        });
        canvasElements.push( heightSlider );
        is3DCheckbox = createCheckbox( '3D', false ).changed( ()=>{
            reset();

            // TODO : 3D에서 2D로 전향하는 방법을 찾아야 한다.
            if( is3D ) {
                is3DCheckbox.remove();
            }
        });
        canvasElements.push( is3DCheckbox );
        is3DCheckbox.remove();
        canvasElements.push( createDiv('') );
    }

    awake();

    if( statuses.visible ) {
        canvasElements.push( createP('') );
        canvasElements.push( createDiv('[ View ]') );
    }
}

function removeCanvas() {

    noCanvas();

    for( var e of canvasElements ) {
        if( e ) {
            e.remove();
        }
    }
    canvasElements = [];
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

    update();
    render();

    // ......

    // 상태뷰 드로잉

    if( statuses.visible ) {
        statuses.fps    = floor(frameRate());
        statuses.drawCount++;
        statuses.is3D   = is3D;
        statuses.width  = width;
        statuses.height = height;
    }

    var statusString = '[statuses]<br/>';
    for( const prop in statuses ) {
        if( statuses.hasOwnProperty(prop) ) {
            statusString += `${prop} = ${statuses[prop]}<br/>`;
        }
    }
    statusesView.html(statusString);
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

    start();

    // 상태뷰

    statuses.drawCount = 0;

    createStatusesView();

    changing = false;
}

function createStatusesView () {

    if( statusesView ) statusesView.remove();

    if( statuses.visible ) {
        statusesView = createDiv(statusesView);
    }
}
