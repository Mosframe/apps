/**
 * sketch.js
 *
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 * 지진 데이터 : http://earthquake.usgs.gov/data
 * 지도 데이터 : https://www.mapbox.com
 * 메르카토 맵 계산법 : https://en.wikipedia.org/wiki/Web_Mercator
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 변수, 오브젝트 정의
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
// p5.js 함수들
// -----------------------------------------------------------------

function preload() {

    geoMap.load();
    earthquake.load();
}

function setup () {

    createCanvas(1024, 512);

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

function draw () {

    //background(51);

}

// -----------------------------------------------------------------
// 지구맵
// -----------------------------------------------------------------

function GeoMap() {

    this.api            = 'api.mapbox.com';
    this.styles         = 'styles/v1/mapbox/dark-v8/static';
    this.overlay        = ''; // 다른 맵 URL를 넣어서 오버레이시킬때 사용한다.
    this.lat            = center.lat; // 위도 (-90 ~ 90 )
    this.lon            = center.lon; // 경도 (-180 ~ 180)
    this.zoom	        = 1; // 확대 래벨
    this.bearing        = 0; // 방위각 ( 0 ~ 360 )
    this.pitch          = 0; // 카메라 X축 회전 각도
    this.auto           = '' ; // auto를 추가하면 뷰포트가 오버레이의 경계에 맞춰집니다. 이 옵션을 사용하면 자동으로 lon 및 lat를 대체합니다.
    this.width          = 1024 ;
    this.height         = 512 ;
    this.accessToken    = 'pk.eyJ1IjoibW9zZnJhbWUiLCJhIjoiY2piaXJnb2pmMDdocTMxbzEycm1zM3ZwMCJ9.lmTH29YX3Jo5HYFaaqhU2w';
    this.image          = undefined;

    this.load = () => {
        this.image = loadImage( this.url() );
    }

    this.url = () => {
        return `https://${this.api}/${this.styles}/${this.lon},${this.lat},${this.zoom},${this.bearing},${this.pitch}${this.auto}/${this.width}x${this.height}?access_token=${this.accessToken}`;
    }

    this.mercatorX = ( lon ) => {

        lon = radians(lon);

        var size = height/2;

        var a = (size/PI) * pow(2,this.zoom);
        var b = (lon + PI);
        return a * b;
    }

    this.mercatorY = ( lat ) => {

        lat = radians(lat);

        var size = height/2;

        var a = (size/PI) * pow(2,this.zoom);
        var b = tan( PI/4 + lat/2 );
        var c = PI - log(b);
        return a * c;
    }

}

// -----------------------------------------------------------------
// 지진
// -----------------------------------------------------------------

function Eathquake() {

    this.data = undefined;

    // 모든 데이터는 5분주기로 갱신됨

    //this.period = 'all_hour'; // 1시간
    //this.period = 'all_day';  // 1일(24시간)
    //this.period = 'all_week'; // 1주일(7일)
    this.period = 'all_month';  // 1달(30일)

    this.load = () => {
        this.data = loadStrings( this.url() );
        //console.log(this.data);
    }

    this.url = () => {
        return `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${this.period}.csv`;
    }
}


// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

