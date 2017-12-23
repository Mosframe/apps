/**
 * sketch.js
 *
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 * 미디어 위키 : https://www.mediawiki.org/wiki/API:Main_page
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 변수, 오브젝트 정의
// -----------------------------------------------------------------
let userInput;
let searchUrl   = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
let contentUrl  = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=';

let counter = 0;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------


function setup () {

    noCanvas();
    //createCanvas(1024, 512);

    userInput = select('#userinput');
    userInput.changed(startSearch);
}

function draw () {

    //background(51);

}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

function startSearch () {

    counter = 0;
    goWiki(userInput.value());
}

function goWiki (term) {

    ++counter;

    if( counter < 10 ) {
        let url = searchUrl + term;
        //console.log(url);
        loadJSON(url,gotSearch,'jsonp');
    }
}

function gotSearch (data) {

    console.log(data);
    let len = data[1].length;
    let index = floor(random(len));
    //console.log(data[1][index]);

    let title = data[1][index];
    console.log(title);

    if( title ) {

        title = title.replace(/\s+/g, '_'); // space => _
        console.log('Querying: '+title);

        let link = data[3][index];
        createDiv(`<a href=${link}>${title}</a>`);

        let url = contentUrl + title;
        loadJSON( url, getContent, 'jsonp' );
    }
}

function getContent (data) {

    //console.log(data);
    //console.log(Object.keys(data.query.pages));

    let pages = data.query.pages;
    let  pageId = Object.keys(pages)[0];
    //console.log(pageId);
    let content = pages[pageId].revisions[0]['*'];
    //console.log(content);

    let wordRegex = /\b\w{4,}\b/g;
    let words = content.match(wordRegex);
    //console.log(words);
    var word = random(words);
    //console.log(word);
    goWiki(word);
}