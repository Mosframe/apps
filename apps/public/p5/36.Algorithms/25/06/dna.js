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

    constructor ( genes ) {

        if( genes ) {
            this.genes = genes; // 유전자 배열 (velocity 리스트)
        } else {
            this.genes = []; // 유전자 배열 (velocity 리스트)
            for( var i=0; i<lifespan; ++i ) {
                this.genes[i] = p5.Vector.random2D();
                this.genes[i].setMag(0.1);
            }
        }
    }

    // 두 DNA를 교배하여 자식을 생성한다.

    crossover ( partner ) {

        // 교차점을 무작위로 지정한 후 교차점을 기반으로 자신과 파트너를 결합한다.

        var newGenes = [];
        var mid = floor(random(this.genes.length));
        for( var i=0; i<this.genes.length; ++i ) {
            if( i > mid ) {
                newGenes[i] = this.genes[i];
            } else {
                newGenes[i] = partner.genes[i];
            }
        }
        return new DNA( newGenes );
    }

    // 돌연변이 생성

    mutation () {

        for( var i=0; i<this.genes.length; ++i ) {
            if( random(1) < 0.01 ) { // 1% 확률로 돌연변이 생성
                this.genes[i] = p5.Vector.random2D();
                this.genes[i].setMag(0.1);
            }
        }
    }
}