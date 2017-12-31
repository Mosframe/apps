/**
 * sketch.js
 *
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 변수, 오브젝트 정의
// -----------------------------------------------------------------
var zip=10003;
var forecast;
var temperature;
var weather;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function preload () {

}

function setup () {

    createCanvas(400, 400);

    var url = 'http://xml.weather.yahoo.com/forecastrss?p='+zip;
    var xml = loadXML(url,gotData);

}

function draw () {

    background(0);

    fill(flower.r,flower.g,flower.b);
    text(flower.name, 10, 50);
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

function gotData() {

    forecast = xml.getChild('channel/item/yweather:forecast');
    temperature = forecast.getNum('high');
    weather = forecast.getString('text');
}