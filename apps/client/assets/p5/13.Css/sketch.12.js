/**
 * sketch.js
 *
 * p5.js 레퍼런스: http://p5js.org/reference
 * 웹기술 레퍼런스: http://developer.mozilla.org
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 변수, 오브젝트 정의
// -----------------------------------------------------------------
var dropzone;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

// 설정

function setup () {

    createCanvas(200,200);
    background(0);

    dropzone = select('#dropzone');
    dropzone.dragOver(highlight);
    dropzone.dragLeave(unhighlight);
    // 버전문제인지  drop함수를 사용하면 dragOver와dragLeave 작동하지 않는다.
    dropzone.drop(gotFile,unhighlight); // 여러개의 파일을 한번에 드롭해도 작동한다.
}

// 디스플레이

function draw () {
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

function highlight () {
    dropzone.style('background-color', '#ccc');
}

function unhighlight () {
    dropzone.style('background-color', '#fff');
}

function gotFile ( file  ) {

    //createP( `name=${file.name}, type=${file.type}, size=${file.size}` );

    if( file.type == 'image' ) {
        createP( file.name + " "  + file.size );
        var img = createImg( file.data );
        img.size(100,100);

    }
}