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

    title       = 'Mapping Earthquake Data : 지진데이터 매핑';
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

// 구글에서 검색하여 원하는 도시의 위도와 경도를 얻는다.
var seoul = {
    lat: 37.532600,
    lon: 127.024612
};

var center = {
    lat: 0,
    lon: 0,
};


var geoMap      = new GeoMap();
var earthquake  = new Eathquake();

// -----------------------------------------------------------------
// 사전 작업 ( preload )
// -----------------------------------------------------------------

function awake () {

    geoMap.load();
    earthquake.load();
}

// -----------------------------------------------------------------
// 프레임 갱신 시작 ( setup )
// -----------------------------------------------------------------

function start () {

    // pixelDensity(1);
    // frameRate(5);
    background(51);
    // colorMode(HSB);
    //angleMode(DEGREES);
    // removeCanvas();


    translate(width/2,height/2);
    imageMode(CENTER);
    image(geoMap.image,0,0);

    var cx = geoMap.mercatorX(center.lon);
    var cy = geoMap.mercatorY(center.lat);

    var maxMag = 0;

    for( var i=0; i<earthquake.data.length; ++i ) {

        var data = earthquake.data[i].split(/,/);
        //console.log(data);
        var lat = data[1];
        var lon = data[2];
        var mag = data[4];

        if( maxMag < mag ) {
            maxMag = mag;
        }

        // 포물선화 시킨다.
        mag = pow(10,mag);
        mag = sqrt(mag);

        var magmax = sqrt(pow(10,10)); // 최대치

        var x       = geoMap.mercatorX(lon) - cx;
        var y       = geoMap.mercatorY(lat) - cy;
        var size    = map(mag,0,magmax,0,1000);
        var b       = map(mag,0,magmax/50,255,0);

        stroke(255,0,b);
        fill(255,0,b,64);
        ellipse(x,y,size,size);
    }
    console.log(maxMag);
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
    // background(51);
}


// -----------------------------------------------------------------
// 프로젝트 전용 함수들
// -----------------------------------------------------------------

