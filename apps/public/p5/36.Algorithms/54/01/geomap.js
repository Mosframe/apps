/**
 * geomap.js
 *
 * p5.js    : http://p5js.org/reference
 * web      : http://developer.mozilla.org
 * @author  : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 지구맵 ( 메르카토르 도법 )
// -----------------------------------------------------------------

class GeoMap {

    // 생성자

    constructor () {

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
    }

    // 데이터 API 주소

    url () {
        return `https://${this.api}/${this.styles}/${this.lon},${this.lat},${this.zoom},${this.bearing},${this.pitch}${this.auto}/${this.width}x${this.height}?access_token=${this.accessToken}`;
    }

    // 맵 데이터(이미지) 로드

    load () {
        this.image = loadImage( this.url() );
    }

    // 경도를 메르카토르 X축으로 변환

    mercatorX ( lon ) {

        lon = radians(lon);

        var size = height/2;

        var a = (size/PI) * pow(2,this.zoom);
        var b = (lon + PI);
        return a * b;
    }

    // 위도를 메르카토르 Y축으로 변환

    mercatorY ( lat ) {

        lat = radians(lat);

        var size = height/2;

        var a = (size/PI) * pow(2,this.zoom);
        var b = tan( PI/4 + lat/2 );
        var c = PI - log(b);
        return a * c;
    }

}