/**
 * ga.js
 *
 * @author : https://github.com/Mosframe
 */


// 구간별 거리 비율 계산

function calculateFitness () {

    for( var i=0; i<population.length; ++i ) {
        var d = calcDistance(cities, population[i]);
        if( d < recordDistance ) {
            recordDistance = d;
            bestEver = population[i];
        }
        fitness[i] = 1 / (d+1);
    }
}

// 피트니스 노말라이즈

function normalizeFitness () {

    var sum = 0;
    for( var i=0; i<fitness.length; ++i ) {
        sum += fitness[i];
    }
    for( var i=0; i<fitness.length; ++i ) {
        fitness[i] = fitness[i] / sum;
    }
}

// 다음 파플레이션 할당

function nextGeneration () {

    var newPopulation = [];
    for( var i=0; i<population.length; ++i ) {
        var order = pickOne( population, fitness );
        mutate(order);
        newPopulation[i] = order;
    }

    population = newPopulation;
}

// 무작위로 오더 리스트를 얻는다.

function pickOne( list, prob ) {

    var index = 0;
    var r = random(1);
    while(r>0) {
        r = r - prob[index];
        ++index;
    }
    --index;
    return list[index].slice();
}

// 오더 리스트를 무작위로 변조 시킨다.

function mutate ( order, mutationRate ) {

    var indexA = floor(random(order.length));
    var indexB = floor(random(order.length));
    swap( order, indexA, indexB );
}