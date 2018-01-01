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
var a = 0;
var sponge = [];
var button;

// -----------------------------------------------------------------
// p5.js 함수들
// -----------------------------------------------------------------

function setup () {

    button = createButton('Generate');
    button.mousePressed(()=>{

        var next = [];
        for( var b of sponge ) {
            var newBoxes = b.generate();
            next = next.concat(newBoxes);
        }
        sponge = next;
    });
    createP('');

    createCanvas(800,450,WEBGL);

    var b = new Box(0,0,0,200);
    sponge.push(b);

}

function draw () {

    background(51);
    //stroke(255);
    noStroke();
    //noFill();

	var dirY = (mouseY/height - 0.5) * 1;
	var dirX = (mouseX/width  - 0.5) * 1;
    directionalLight(255, 255, 255, dirX, dirY, 1);

    //translate(width/2, height/2);

    rotateX(a);
    rotateY(a*0.4);
    rotateZ(a*0.1);

    for( var b of sponge ) {
        b.show();
    }

    a += 0.01;
}

// -----------------------------------------------------------------
// 사용자 정의 함수들
// -----------------------------------------------------------------
