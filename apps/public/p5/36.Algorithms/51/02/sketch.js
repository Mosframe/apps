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
var v = {};
var canvasContainer;
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

    v.canvasVisible = true;
    v.statusVisible = true;

    createP('');
    createDiv('[ Inspector ]');

    createButton('statuses').mousePressed(()=>{
        v.statusVisible = !v.statusVisible;
        createStatusesView();
    });
    createDiv('');

    canvasContainer = createDiv('');

    if( v.canvasVisible ) {

        createSpan('width:').parent( canvasContainer );
        widthSlider = createSlider( 100, 1000, defaultCanvasWidth, 10 ).changed( ()=>{
            reset();
        }).parent( canvasContainer );

        createSpan('height:').parent( canvasContainer );
        heightSlider = createSlider( 100, 1000, defaultCanvasHeight, 10 ).changed( ()=>{
            reset();
        }).parent( canvasContainer );
        heightSlider.parent( canvasContainer );
        is3DCheckbox = createCheckbox( '3D', false ).changed( ()=>{
            reset();

            // TODO : 3D에서 2D로 전향하는 방법을 찾아야 한다.
            if( is3D ) {
                is3DCheckbox.remove();
            }
        }).parent( canvasContainer );
        is3DCheckbox.remove();
        createDiv('').parent( canvasContainer );
    }

    awake();

    if( v.canvasVisible ) {
        createP('').parent( canvasContainer );
        createDiv('[ View ]').parent( canvasContainer );
    }
}

function removeCanvas() {

    noCanvas();
    canvasContainer.remove();
    v.canvasVisible = false;
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

    if( v.statusVisible ) {
        v.fps    = floor(frameRate());
        v.drawCount++;
        v.is3D   = is3D;
        v.width  = width;
        v.height = height;
    }

    var statusString = '[statuses]<br/>';
    for( const prop in v ) {
        if( v.hasOwnProperty(prop) ) {
            statusString += `${prop} = ${v[prop]}<br/>`;
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
    thisCanvas.parent( canvasContainer );

    start();

    // 상태뷰

    v.drawCount = 0;

    createStatusesView();

    changing = false;
}

function createStatusesView () {

    if( statusesView ) statusesView.remove();

    if( v.statusVisible ) {
        statusesView = createDiv(statusesView);
    }
}
