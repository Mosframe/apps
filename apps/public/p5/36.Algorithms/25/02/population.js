/**
 * population.js
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 팽창
// -----------------------------------------------------------------
class Population {

    // 생성자

    constructor () {

        this.rokets = [];
        this.size   = 25;

        for( var i=0; i<this.size; ++i ) {

            this.rokets[i] = new Rocket();
        }
    }


    // 실행

    run () {

        for( var i=0; i<this.rokets.length; ++i ) {
            this.rokets[i].update();
            this.rokets[i].draw();
        }
    }

}