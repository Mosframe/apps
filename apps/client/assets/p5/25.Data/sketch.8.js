/**
 * sketch.js
 *
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 * Giphy API : https://developers.giphy.com
 * 나의 APIKey : XrRE36VxdPjrssxJgkuT9KDW92rUIKtD
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 변수, 오브젝트 정의
// -----------------------------------------------------------------
var api     = 'api.giphy.com';
var path    = '/v1/gifs/search';
var query   = 'rainbow';
var apiKey  = 'XrRE36VxdPjrssxJgkuT9KDW92rUIKtD';

var url = `http://${api}${path}?q=${query}&api_key=${apiKey}`;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function setup () {

    noCanvas();
    //createCanvas(600, 400);

    loadJSON( url, gotData );

}

function draw () {

    background(51);

}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

function gotData ( giphy ) {

    console.log(giphy);
    console.log(giphy.data[0].images.original.url);

    for( var i=0; i<giphy.data.length; ++i ) {
        createImg(giphy.data[i].images.original.url);
    }
}