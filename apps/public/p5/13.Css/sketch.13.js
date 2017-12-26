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

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

// 설정

function setup () {

    createP("캔버스에 이미지파일을 드롭시킨다.");

    var canvas = createCanvas(200,200);
    background(0);

    canvas.drop(gotFile); // 여러개의 파일을 한번에 드롭해도 작동한다.
}


// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------

function gotFile ( file  ) {

    //createP( `name=${file.name}, type=${file.type}, size=${file.size}` );

    if( file.type == 'image' ) {
        createP( file.name + " "  + file.size );
        var img = createImg( file.data );
        img.size(100,100);
        //img.hide();

        // 현재 버전에선 동작하지 않는다.
        image( img, 0, 0, 200, 200);
    }
}