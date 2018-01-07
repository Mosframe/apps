/**
 * population.js
 *
 * @author : https://github.com/Mosframe
 */


// -----------------------------------------------------------------
// 팽창 : 모든 로켓 관리
// -----------------------------------------------------------------
class Population {

    // 생성자

    constructor () {

        this.size       = 25;
        this.rockets    = [];
        this.matingPool = []; // DNA 교배 풀

        for( var i=0; i<this.size; ++i ) {

            this.rockets[i] = new Rocket();
        }
    }

    // 모든 로켓의 임무를 수행 평가하여 다음 세대에 진화의 척도를 남긴다.

    evaluate () {

        // 모든 로켓의 피트니스 계산

        maxFitness = 0;
        for( var i=0; i<this.rockets.length; ++i ) {
            var rocket = this.rockets[i];
            rocket.calcFitness();
            if( rocket.fitness > maxFitness ) {
                maxFitness = rocket.fitness;
            }
        }

        // 모든 로켓의 피트니스 노말라이징

        for( var i=0; i<this.rockets.length; ++i ) {
            var rocket = this.rockets[i];
            rocket.fitness /= maxFitness;
        }

        // 교배 풀 설정

        this.matingPool = [];
        for( var i=0; i<this.rockets.length; ++i ) {
            var rocket = this.rockets[i];
            var n = rocket.fitness * 100;
            for( var j=0; j<n; ++j ) {
                this.matingPool.push(rocket);
            }
        }
    }

    // 후손 선택

    selection () {

        var newRockets = [];
        for( var i=0; i<this.rockets.length; ++i ) {
            var parentA = random( this.matingPool ).dna;
            var parentB = random( this.matingPool ).dna;
            var child   = parentA.crossover( parentB );
            child.mutation();
            newRockets[i] = new Rocket(child);
        }
        this.rockets = newRockets;
    }

    // 실행

    run () {

        for( var i=0; i<this.rockets.length; ++i ) {
            this.rockets[i].update();
            this.rockets[i].draw();
        }
    }

}