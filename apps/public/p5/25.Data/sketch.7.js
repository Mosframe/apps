/**
 * sketch.js
 *
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 * 뉴욕타임즈 API : http://developer.nytimes.com/
 * Sample APIKey : 99cfea65a5bb30650b3d31eb1713233e:15:73386102
 * 나의 APIKey : a61370c0e15d44e9ac6d1a35e055f9f1
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 변수, 오브젝트 정의
// -----------------------------------------------------------------
var url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=';
url += 'porcupine';
url += '&api-key=a61370c0e15d44e9ac6d1a35e055f9f1';

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

function gotData ( data ) {

    console.log(data);
    console.log(data.response.docs[1].headline.main);

    var articles = data.response.docs;
    for( var i=0; i<articles.length; ++i) {
        createElement('h1',articles[i].headline.main);
        createP(articles[i].snippet);
    }
}