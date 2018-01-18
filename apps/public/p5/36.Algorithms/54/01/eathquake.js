/**
 * eathquake.js
 *
 * p5.js    : http://p5js.org/reference
 * web      : http://developer.mozilla.org
 * @author  : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 지진 데이터
// -----------------------------------------------------------------

class Eathquake {

    // 생성자

    constructor () {

        this.data = undefined;
        // 모든 데이터는 5분주기로 갱신됨

        //this.period = 'all_hour'; // 1시간
        //this.period = 'all_day';  // 1일(24시간)
        //this.period = 'all_week'; // 1주일(7일)
        this.period = 'all_month';  // 1달(30일)
    }

    // 지진데이터 API 주소

    url () {
        return `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${this.period}.csv`;
    }

    // 지진데이터 로드

    load () {
        this.data = loadStrings( this.url() );
        //console.log(this.data);
    }
}
