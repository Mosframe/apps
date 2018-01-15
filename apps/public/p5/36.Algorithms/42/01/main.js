/**
 * main.js
 *
 * p5.js    : http://p5js.org/reference
 * web      : http://developer.mozilla.org
 * @author  : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 환경설정 변수들 설정
// -----------------------------------------------------------------

function description () {

    title       = 'Saving Drawings to Firebase : Firebase에 드로잉 저장';
    subTitle    = '기본 프레임워크 설정';

    referUrls.push({
        text:'Firebase doc',
        link:'https://firebase.google.com/docs'
    });


    defaultCanvasWidth  = 200;
    defaultCanvasHeight = 200;
}

// -----------------------------------------------------------------
// 프로젝트 전용 변수들
// -----------------------------------------------------------------
var database;
var drawing = [];
var currPath = [];
var isDrawing = false;

// -----------------------------------------------------------------
// 사전 작업 ( preload )
// -----------------------------------------------------------------

function awake () {

    createButton("save").mousePressed(saveDrawing);
    createButton("clear").mousePressed(clearDrawing);
    createP(`
    <ol id="drawingList">
    </ol>
    `);
}

// -----------------------------------------------------------------
// 프레임 갱신 시작 ( setup )
// -----------------------------------------------------------------

function start () {

    // pixelDensity(1);
    //frameRate(5);
    background(0);
    //colorMode(HSB);
    // angleMode(DEGREES);
    //removeCanvas();


    thisCanvas.mousePressed(startPath);
    thisCanvas.mouseReleased(endPath);


    // 데이타베이스 연결

    var config = {
        apiKey: "AIzaSyBJU3PzZtMuu9R9KksgJPZI_56yZr5_yVE",
        authDomain: "savingdrawings.firebaseapp.com",
        databaseURL: "https://savingdrawings.firebaseio.com",
        projectId: "savingdrawings",
        storageBucket: "savingdrawings.appspot.com",
        messagingSenderId: "437668954594"
    };
    firebase.initializeApp(config);
    database = firebase.database();

    // 파라메터에 ID가 있으면

    var params = getURLParams();
    console.log(params);
    if( params.id ) {
        showDrawing( params.id );
    }

    // 데이터베이스에서 모든 데이터 리스트 얻기

    var ref = database.ref('drawings');
    ref.on('value',gotData, errData);
 }

// -----------------------------------------------------------------
// 키 입력
// -----------------------------------------------------------------

function keyPressed () {


}

// -----------------------------------------------------------------
// 프레임 갱신
// -----------------------------------------------------------------

function update () {


}

// -----------------------------------------------------------------
// 프레임 렌더링
// -----------------------------------------------------------------

function render () {

    // noLoop();
    // colorMode(HSB);
    background( 0 );

    if( isDrawing ) {
        var point = {
            x: mouseX,
            y: mouseY,
        }
        currPath.push(point);
    }

    // 모든 패스 드로잉

    stroke(255);
    strokeWeight(4);
    noFill();
    for( var i=0; i<drawing.length; ++i ) {
        var path = drawing[i];
        beginShape();
        for( var j=0; j<path.length; ++j ) {
            vertex(path[j].x, path[j].y);
        }
        endShape();
    }

}


// -----------------------------------------------------------------
// 프로젝트 전용 함수들
// -----------------------------------------------------------------



function startPath () {

    isDrawing = true;
    currPath = [];
    drawing.push(currPath);
}

function endPath () {
    isDrawing = false;
}

function saveDrawing () {

    var ref = database.ref('drawings');
    var data = {
        name: "test",
        drawing: drawing,
    }
    var result = ref.push(data, (err,status)=>{

        console.log(err,status);
    });
    console.log(result.key);
}

function clearDrawing () {
    drawing = [];
}

function gotData (data) {

    // 기존 리스트 삭제

    var elts = selectAll('.listing');
    for( var i=0; i<elts.length; ++i ) {
        elts[i].remove();
    }

    // 리스팅

    var drawings = data.val();
    if( drawings ) {
        var keys = Object.keys(drawings);
        for( var i=0;i<keys.length; ++i ) {
            var key = keys[i];
            //console.log(key);

            var li = createElement('li','').parent('drawingList');
            li.class('listing');
            var ahref = createA('#',key).mousePressed(showDrawing).parent(li);

            // permalink(퍼머링크:고유링크) => url + id

            var perma = createA('?id='+key,'permalink').parent(li);
            perma.style('padding','4px');
        }
    }
}

function errData (err) {
    console.log(err);
}

function showDrawing (key) {

    console.log(arguments);

    if( key instanceof MouseEvent ) {
        key = this.html();
    }

    var ref = database.ref('drawings/'+key);
    //ref.on('value',oneDrawing, errData);
    ref.once('value',oneDrawing, errData);
}

function oneDrawing(data) {

    var dbdrawing = data.val();
    //console.log(dbdrawing);

    drawing = dbdrawing.drawing;
}