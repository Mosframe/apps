/**
 * sketch.js
 *
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 * 날씨 API : https://openweathermap.org/current  : mosframe / 일반9자리
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 변수, 오브젝트 정의
// -----------------------------------------------------------------
var api     = 'http://api.openweathermap.org/data/2.5/weather';
var apiKey  = `1db9a3119a9e1f8791b148311e84d5d1`;
var units   = 'metric';

var input;

var weather;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function setup () {

    createCanvas(400, 200);

    input = select('#city');
    var button = select('#submit');
    button.mousePressed(weatherAsk);

}

function draw () {

    background(0);
    if(weather) {
        var temp        = weather.main.temp;
        var humidity    = weather.main.humidity;

        ellipse( 100, 100, temp, temp );
        ellipse( 300, 100, humidity, humidity );
    }
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

function weatherAsk () {

    var city = input.value();
    var url = `${api}?q=${city}&APPID=${apiKey}&units=${units}`;
    loadJSON( url, gotData, 'jsonp');
}

function gotData ( data ) {

    console.log(data);
    weather = data;
}