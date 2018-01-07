/**
 * dna.js
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// DNA : 유전자
// -----------------------------------------------------------------
class DNA {

    // 생성자

    constructor () {

        this.genes = []; // 유전자 배열 (velocity 리스트)
        for( var i=0; i<lifespan; ++i ) {
            this.genes[i] = p5.Vector.random2D();
            this.genes[i].setMag(0.1);
        }
    }
}