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

    title       = '3D Earthquake Data Visualization : 지진데이터 3D 매핑';
    subTitle    = '기본 프레임워크 설정';

    referUrls.push({
        text:'지진 데이터',
        link:'http://earthquake.usgs.gov/data'
    });
    referUrls.push({
        text:'지도 데이터',
        link:'https://www.mapbox.com'
    });
    referUrls.push({
        text:'메르카토 맵 계산법',
        link:'https://en.wikipedia.org/wiki/Web_Mercator'
    });

    defaultCanvasWidth  = 1024;
    defaultCanvasHeight = 512;
}

// -----------------------------------------------------------------
// 프로젝트 전용 변수들
// -----------------------------------------------------------------

var r = 200;

var angle = 0;
var table;

var globe;
var earthTexture;

// -----------------------------------------------------------------
// 사전 작업 ( preload )
// -----------------------------------------------------------------

function awake () {

    //geoMap.load();
    earthTexture = loadImage('../../../../images/earth.jpg');
    // table = loadTable("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.csv", "header");
    table = loadTable("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv", "header");
}

// -----------------------------------------------------------------
// 프레임 갱신 시작 ( setup )
// -----------------------------------------------------------------

function start () {

    // pixelDensity(1);
    // frameRate(5);
    // background(51);
    // colorMode(HSB);
    // angleMode(DEGREES);
    // removeCanvas();

 }

// -----------------------------------------------------------------
// 입력
// -----------------------------------------------------------------

function keyPressed () {

}

function  keyReleased () {

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
    // frameRate(5);
    background(51);


    //translate(width*0.5, height*0.5,0);

    var pos = createVector(0,0,0);
    var v2 = createVector(0,0,1);
    var p = pos.cross(v2);

    rotateY(angle);
    angle += 0.05;

    //lights();
    //fill(200);
    noStroke();
    //sphere(r);
    texture(earthTexture);
    sphere(200);

    for( var row of table.getRows() ) {

        //console.log(row);
        var lat = row.getNum("latitude");
        var lon = row.getNum("longitude");
        var mag = Number(row.getString("mag")); //값이 없을 수도 있으므로 주의

        var theta = radians(lat) + PI/2;
        var phi = radians(lon) + PI;
        var x = r * sin(theta) * cos(phi);
        var y = -r * sin(theta) * sin(phi);
        var z = r * cos(theta);
        var pos = createVector(x, y, z);

        var h = pow(10, mag);
        var maxh = pow(10, 7);
        h = map(h, 0, maxh, 10, 100);
        var xaxis = createVector(1, 0, 0);
        var angleb = xaxis.angleBetween(pos);
        var raxis = xaxis.cross(pos);

        push();
        translate(x, y, z);
        rotate(angleb, raxis);
        fill(255,0,0);
        box(h, 5, 5);
        pop();
    }
}


// -----------------------------------------------------------------
// 프로젝트 전용 함수들
// -----------------------------------------------------------------

